const express = require('express');
const { body, validationResult } = require('express-validator');
const { Blog, User } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all published blogs
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = { isPublished: true };
    if (tag) {
      whereClause.tags = { $contains: [tag] };
    }

    const blogs = await Blog.findAndCountAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName', 'username'],
      }],
      order: [['publishedAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      blogs: blogs.rows,
      totalPages: Math.ceil(blogs.count / limit),
      currentPage: parseInt(page),
      total: blogs.count,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: { 
        slug: req.params.slug,
        isPublished: true 
      },
      include: [{
        model: User,
        as: 'author',
        attributes: ['firstName', 'lastName', 'username'],
      }],
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blog (Admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('title').isLength({ min: 5, max: 200 }),
  body('content').isLength({ min: 50 }),
  body('slug').isLength({ min: 3, max: 200 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const blogData = {
      ...req.body,
      authorId: req.user.id,
    };

    if (req.body.isPublished) {
      blogData.publishedAt = new Date();
    }

    const blog = await Blog.create(blogData);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blog (Admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const updateData = { ...req.body };
    if (req.body.isPublished && !blog.publishedAt) {
      updateData.publishedAt = new Date();
    }

    await blog.update(updateData);
    res.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete blog (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.destroy();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;