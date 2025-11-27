import React from 'react';
import { Typography, Paper, Box, List, ListItem, ListItemText } from '@mui/material';

const About = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        О приложении
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Todo App с современным стеком технологий
        </Typography>
        
        <Typography paragraph>
          Это демонстрационное приложение построено с использованием:
        </Typography>
        
        <List>
          <ListItem>
            <ListItemText primary="React" secondary="Библиотека для построения пользовательских интерфейсов" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Redux Toolkit" secondary="Официальный способ написания Redux логики" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Material-UI" secondary="Библиотека компонентов для React" />
          </ListItem>
          <ListItem>
            <ListItemText primary="React Router" secondary="Маршрутизация для React приложений" />
          </ListItem>
          <ListItem>
            <ListItemText primary="createAsyncThunk" secondary="Для обработки асинхронных операций" />
          </ListItem>
        </List>
        
        <Typography>
          Бэкенд реализован в виде заглушки с имитацией сетевых задержек.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;