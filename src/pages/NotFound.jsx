import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <Box textAlign="center" py={8}>
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography color="text.secondary" paragraph>
        Извините, запрашиваемая страница не существует.
      </Typography>
      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        component={Link}
        to="/"
      >
        На главную
      </Button>
    </Box>
  );
};

export default NotFound;