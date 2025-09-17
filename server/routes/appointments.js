const express = require('express');
const { body, validationResult } = require('express-validator');
const { Appointment, User, Rashi } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const router = express.Router();

// Create email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Get user's appointments
router.get('/', authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { clientId: req.user.id },
      include: [{
        model: Rashi,
        as: 'rashi',
        attributes: ['name', 'symbol', 'element'],
      }],
      order: [['scheduledTime', 'ASC']],
    });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all appointments (Admin only)
router.get('/admin', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['firstName', 'lastName', 'email', 'username'],
        },
        {
          model: Rashi,
          as: 'rashi',
          attributes: ['name', 'symbol', 'element'],
        },
      ],
      order: [['scheduledTime', 'ASC']],
    });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create appointment
router.post('/', authenticateToken, [
  body('consultationType').isIn(['birth-chart', 'compatibility', 'career', 'general']),
  body('scheduledTime').isISO8601(),
  body('zodiacSign').optional().isIn(['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                                      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']),
  body('preferredMethod').isIn(['video', 'phone']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { consultationType, scheduledTime, zodiacSign, notes, preferredMethod } = req.body;

    // Calculate price and duration based on consultation type
    const consultationTypes = {
      'birth-chart': { price: 99, duration: 60 },
      'compatibility': { price: 79, duration: 45 },
      'career': { price: 59, duration: 30 },
      'general': { price: 49, duration: 30 },
    };

    const typeDetails = consultationTypes[consultationType];

    const appointment = await Appointment.create({
      clientId: req.user.id,
      consultationType,
      scheduledTime: new Date(scheduledTime),
      zodiacSign,
      notes,
      preferredMethod,
      price: typeDetails.price,
      duration: typeDetails.duration,
      status: 'pending',
    });

    // Send confirmation email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.user.email,
        subject: 'Appointment Confirmation - KundliVision',
        html: `
          <div style="font-family: 'Cinzel', serif; background: linear-gradient(135deg, #4B0082, #191970); color: #F5F5DC; padding: 20px; border-radius: 10px;">
            <h2 style="color: #FFD700; text-align: center;">🔮 Mystical Consultation Confirmed 🔮</h2>
            <p>Dear ${req.user.firstName},</p>
            <p>Your mystical consultation has been scheduled successfully!</p>
            
            <div style="background: rgba(46, 8, 84, 0.6); padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #FFD700;">Consultation Details:</h3>
              <p><strong>Type:</strong> ${consultationType.replace('-', ' ').toUpperCase()}</p>
              <p><strong>Date & Time:</strong> ${new Date(scheduledTime).toLocaleString()}</p>
              <p><strong>Duration:</strong> ${typeDetails.duration} minutes</p>
              <p><strong>Method:</strong> ${preferredMethod.toUpperCase()}</p>
              <p><strong>Price:</strong> $${typeDetails.price}</p>
              ${zodiacSign ? `<p><strong>Zodiac Sign:</strong> ${zodiacSign.toUpperCase()}</p>` : ''}
            </div>
            
            <p>Our mystic will contact you 15 minutes before your scheduled time.</p>
            <p style="text-align: center; font-style: italic;">May the stars guide your path! ✨</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      message: 'Appointment scheduled successfully',
      appointment,
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update appointment status (Admin only)
router.put('/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, meetingLink } = req.body;
    
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'client',
        attributes: ['firstName', 'lastName', 'email'],
      }],
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.update({ status, meetingLink });

    // Send status update email
    if (status === 'confirmed' && meetingLink) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: appointment.client.email,
          subject: 'Appointment Confirmed - Meeting Link',
          html: `
            <div style="font-family: 'Cinzel', serif; background: linear-gradient(135deg, #4B0082, #191970); color: #F5F5DC; padding: 20px; border-radius: 10px;">
              <h2 style="color: #FFD700; text-align: center;">🌟 Your Consultation is Confirmed! 🌟</h2>
              <p>Dear ${appointment.client.firstName},</p>
              <p>Your mystical consultation is confirmed and ready!</p>
              
              <div style="background: rgba(46, 8, 84, 0.6); padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <h3 style="color: #FFD700;">Join Your Session:</h3>
                <a href="${meetingLink}" style="background: linear-gradient(45deg, #6A0DAD, #001F54); color: #F5F5DC; padding: 12px 24px; text-decoration: none; border-radius: 25px; display: inline-block; margin: 10px;">
                  🔮 Join Mystical Session
                </a>
              </div>
              
              <p><strong>Scheduled Time:</strong> ${new Date(appointment.scheduledTime).toLocaleString()}</p>
              <p style="text-align: center; font-style: italic;">The cosmic energies await! ✨</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    res.json({ message: 'Appointment status updated', appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel appointment
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: { 
        id: req.params.id,
        clientId: req.user.id,
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.update({ status: 'cancelled' });
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;