import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Article, Search, TrendingUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/blogs', {
        params: {
          page: currentPage,
          limit: 9,
        },
      });
      
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Mock data for demonstration
      setBlogs([
        {
          id: 1,
          title: 'Understanding Your Moon Sign: The Hidden Side of Your Personality',
          slug: 'understanding-moon-sign',
          excerpt: 'While most people know their sun sign, your moon sign reveals your emotional nature and inner self. Discover how to find and interpret your moon sign.',
          featuredImage: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=400',
          tags: ['Moon Sign', 'Astrology Basics', 'Personality'],
          publishedAt: new Date('2024-01-15'),
          author: { firstName: 'Luna', lastName: 'Star' },
        },
        {
          id: 2,
          title: 'Mercury Retrograde: What It Really Means and How to Navigate It',
          slug: 'mercury-retrograde-guide',
          excerpt: 'Mercury retrograde gets a bad reputation, but understanding this cosmic event can help you use its energy constructively rather than fear it.',
          featuredImage: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=400',
          tags: ['Mercury Retrograde', 'Planetary Transits', 'Astrology'],
          publishedAt: new Date('2024-01-10'),
          author: { firstName: 'Cosmic', lastName: 'Guide' },
        },
        {
          id: 3,
          title: 'The Art of Tarot: A Beginner\'s Guide to Reading Cards',
          slug: 'tarot-beginners-guide',
          excerpt: 'Learn the fundamentals of tarot reading, from understanding the major arcana to developing your intuitive abilities with the cards.',
          featuredImage: 'https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=400',
          tags: ['Tarot', 'Divination', 'Spirituality'],
          publishedAt: new Date('2024-01-05'),
          author: { firstName: 'Mystic', lastName: 'Reader' },
        },
        {
          id: 4,
          title: 'Full Moon Rituals: Harnessing Lunar Energy for Manifestation',
          slug: 'full-moon-rituals',
          excerpt: 'Discover powerful full moon rituals that can help you release what no longer serves you and manifest your deepest desires.',
          featuredImage: 'https://images.pexels.com/photos/1252814/pexels-photo-1252814.jpeg?auto=compress&cs=tinysrgb&w=400',
          tags: ['Moon Phases', 'Rituals', 'Manifestation'],
          publishedAt: new Date('2024-01-01'),
          author: { firstName: 'Luna', lastName: 'Star' },
        },
        {
          id: 5,
          title: 'Zodiac Compatibility: Beyond Sun Signs',
          slug: 'zodiac-compatibility-deep-dive',
          excerpt: 'True compatibility goes beyond sun signs. Learn how to analyze complete birth charts for deeper relationship insights.',
          featuredImage: 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=400',
          tags: ['Compatibility', 'Relationships', 'Birth Charts'],
          publishedAt: new Date('2023-12-28'),
          author: { firstName: 'Cosmic', lastName: 'Guide' },
        },
        {
          id: 6,
          title: 'Crystal Healing and Astrology: Choosing Stones for Your Sign',
          slug: 'crystals-for-zodiac-signs',
          excerpt: 'Each zodiac sign resonates with specific crystals. Learn which stones can amplify your natural strengths and support your growth.',
          featuredImage: 'https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=400',
          tags: ['Crystals', 'Healing', 'Zodiac Signs'],
          publishedAt: new Date('2023-12-25'),
          author: { firstName: 'Crystal', lastName: 'Healer' },
        },
      ]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
          <Article sx={{ mr: 2, fontSize: 'inherit' }} />
          Astrology Blog
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Explore the mysteries of the cosmos through our insightful articles
        </Typography>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search articles by title, content, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Blog Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress size={60} />
        </Box>
      ) : filteredBlogs.length > 0 ? (
        <>
          <Grid container spacing={4}>
            {filteredBlogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={blog.featuredImage}
                    alt={blog.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {blog.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.5,
                      }}
                    >
                      {blog.excerpt}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Typography variant="caption" color="text.secondary">
                        By {blog.author.firstName} {blog.author.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'contained' : 'outlined'}
                    onClick={() => handlePageChange(page)}
                    sx={{ minWidth: 40 }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <TrendingUp sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No articles found
          </Typography>
          <Typography color="text.secondary">
            {searchTerm 
              ? `No articles match your search for "${searchTerm}"`
              : 'No articles available at the moment'
            }
          </Typography>
        </Paper>
      )}

      {/* Featured Topics */}
      <Paper sx={{ mt: 6, p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, textAlign: 'center', mb: 3 }}>
          Popular Topics
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {['Astrology Basics', 'Moon Phases', 'Tarot Reading', 'Zodiac Signs', 'Mercury Retrograde', 'Birth Charts', 'Compatibility', 'Manifestation'].map((topic) => (
            <Chip
              key={topic}
              label={topic}
              variant="outlined"
              color="primary"
              sx={{ fontWeight: 500 }}
            />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default Blog;