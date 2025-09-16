import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Style, Shuffle, Visibility } from '@mui/icons-material';

const tarotCards = [
  { name: 'The Fool', meaning: 'New beginnings, innocence, spontaneity', reversed: 'Recklessness, taken advantage of, inconsideration' },
  { name: 'The Magician', meaning: 'Manifestation, resourcefulness, power', reversed: 'Manipulation, poor planning, untapped talents' },
  { name: 'The High Priestess', meaning: 'Intuition, sacred knowledge, divine feminine', reversed: 'Secrets, disconnected from intuition, withdrawal' },
  { name: 'The Empress', meaning: 'Femininity, beauty, nature, abundance', reversed: 'Creative block, dependence on others' },
  { name: 'The Emperor', meaning: 'Authority, establishment, structure, father figure', reversed: 'Domination, excessive control, lack of discipline' },
  { name: 'The Hierophant', meaning: 'Spiritual wisdom, religious beliefs, conformity', reversed: 'Personal beliefs, freedom, challenging the status quo' },
  { name: 'The Lovers', meaning: 'Love, harmony, relationships, values alignment', reversed: 'Self-love, disharmony, imbalance, misalignment of values' },
  { name: 'The Chariot', meaning: 'Control, willpower, success, determination', reversed: 'Self-discipline, opposition, lack of direction' },
  { name: 'Strength', meaning: 'Strength, courage, persuasion, influence', reversed: 'Self doubt, low energy, raw emotion' },
  { name: 'The Hermit', meaning: 'Soul searching, introspection, inner guidance', reversed: 'Isolation, loneliness, withdrawal' },
  { name: 'Wheel of Fortune', meaning: 'Good luck, karma, life cycles, destiny', reversed: 'Bad luck, lack of control, clinging to control' },
  { name: 'Justice', meaning: 'Justice, fairness, truth, cause and effect', reversed: 'Unfairness, lack of accountability, dishonesty' },
  { name: 'The Hanged Man', meaning: 'Suspension, restriction, letting go', reversed: 'Martyrdom, indecision, delay' },
  { name: 'Death', meaning: 'Endings, beginnings, change, transformation', reversed: 'Resistance to change, personal transformation, inner purging' },
  { name: 'Temperance', meaning: 'Balance, moderation, patience, purpose', reversed: 'Imbalance, excess, self-healing, re-alignment' },
  { name: 'The Devil', meaning: 'Bondage, addiction, sexuality, materialism', reversed: 'Releasing limiting beliefs, exploring dark thoughts, detachment' },
  { name: 'The Tower', meaning: 'Sudden change, upheaval, chaos, revelation', reversed: 'Personal transformation, fear of change, averting disaster' },
  { name: 'The Star', meaning: 'Hope, faith, purpose, renewal, spirituality', reversed: 'Lack of faith, despair, self-trust, disconnection' },
  { name: 'The Moon', meaning: 'Illusion, fear, anxiety, subconscious, intuition', reversed: 'Release of fear, repressed emotion, inner confusion' },
  { name: 'The Sun', meaning: 'Positivity, fun, warmth, success, vitality', reversed: 'Inner child, feeling down, overly optimistic' },
  { name: 'Judgement', meaning: 'Judgement, rebirth, inner calling, absolution', reversed: 'Self-doubt, inner critic, ignoring the call' },
  { name: 'The World', meaning: 'Completion, integration, accomplishment, travel', reversed: 'Seeking personal closure, short-cuts, delays' },
];

const TarotReading = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [isReading, setIsReading] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [selectedSpread, setSelectedSpread] = useState('three-card');
  const [cardDialog, setCardDialog] = useState(null);

  const spreads = {
    'single-card': { name: 'Single Card', count: 1, positions: ['Your Guidance'] },
    'three-card': { name: 'Past, Present, Future', count: 3, positions: ['Past', 'Present', 'Future'] },
    'love': { name: 'Love Reading', count: 3, positions: ['You', 'Your Partner', 'Relationship'] },
    'celtic-cross': { name: 'Celtic Cross', count: 5, positions: ['Present', 'Challenge', 'Past', 'Future', 'Outcome'] },
  };

  const drawCards = () => {
    setIsReading(true);
    setShowCards(false);
    
    setTimeout(() => {
      const spread = spreads[selectedSpread];
      const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, spread.count).map((card, index) => ({
        ...card,
        position: spread.positions[index],
        reversed: Math.random() < 0.3, // 30% chance of reversed card
      }));
      
      setSelectedCards(drawn);
      setIsReading(false);
      setShowCards(true);
    }, 2000);
  };

  const resetReading = () => {
    setSelectedCards([]);
    setShowCards(false);
    setCardDialog(null);
  };

  const openCardDialog = (card) => {
    setCardDialog(card);
  };

  const closeCardDialog = () => {
    setCardDialog(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          <Style sx={{ mr: 2, fontSize: 'inherit' }} />
          Tarot Reading
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Discover insights and guidance through the ancient art of tarot
        </Typography>
      </Box>

      {!showCards && (
        <Paper sx={{ p: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Choose Your Spread
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {Object.entries(spreads).map(([key, spread]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedSpread === key ? 2 : 1,
                    borderColor: selectedSpread === key ? 'primary.main' : 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                    },
                  }}
                  onClick={() => setSelectedSpread(key)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {spread.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {spread.count} card{spread.count > 1 ? 's' : ''}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            size="large"
            onClick={drawCards}
            disabled={isReading}
            startIcon={isReading ? null : <Shuffle />}
            sx={{ px: 4, py: 1.5 }}
          >
            {isReading ? 'Drawing Cards...' : 'Draw Cards'}
          </Button>
        </Paper>
      )}

      {showCards && (
        <>
          <Paper sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Your {spreads[selectedSpread].name} Reading
              </Typography>
              <Button variant="outlined" onClick={resetReading}>
                New Reading
              </Button>
            </Box>

            <Grid container spacing={3}>
              {selectedCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={selectedCards.length > 3 ? 2.4 : 4} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                      background: card.reversed 
                        ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(99, 102, 241, 0.1))'
                        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
                    }}
                    onClick={() => openCardDialog(card)}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Typography variant="subtitle2" color="primary.main" gutterBottom>
                        {card.position}
                      </Typography>
                      
                      <Box sx={{ fontSize: '3rem', mb: 2 }}>
                        🃏
                      </Box>
                      
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {card.name}
                      </Typography>
                      
                      {card.reversed && (
                        <Chip
                          label="Reversed"
                          size="small"
                          color="secondary"
                          sx={{ mb: 2 }}
                        />
                      )}
                      
                      <Typography variant="body2" color="text.secondary">
                        Click to reveal meaning
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Reading Summary
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Your {spreads[selectedSpread].name} reading reveals important insights about your current situation. 
              Each card position offers guidance for different aspects of your question. Take time to reflect on 
              how these messages resonate with your life and current circumstances. Remember, tarot is a tool 
              for self-reflection and the cards' meanings should be interpreted in the context of your personal journey.
            </Typography>
          </Paper>
        </>
      )}

      {/* Card Detail Dialog */}
      <Dialog
        open={!!cardDialog}
        onClose={closeCardDialog}
        maxWidth="sm"
        fullWidth
      >
        {cardDialog && (
          <>
            <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {cardDialog.name}
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                {cardDialog.position}
              </Typography>
              {cardDialog.reversed && (
                <Chip
                  label="Reversed"
                  size="small"
                  color="secondary"
                  sx={{ mt: 1 }}
                />
              )}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ fontSize: '4rem', mb: 2 }}>
                  🃏
                </Box>
              </Box>
              
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {cardDialog.reversed ? 'Reversed Meaning:' : 'Upright Meaning:'}
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                {cardDialog.reversed ? cardDialog.reversed : cardDialog.meaning}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Reflect on how this message applies to your current situation and the question you had in mind.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeCardDialog} variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default TarotReading;