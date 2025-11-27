import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import FilterButtons from '../components/FilterButtons';
import BulkActions from '../components/BulkActions';

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Мои задачи
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <AddTodo />
        <FilterButtons />
        <TodoList />
        <BulkActions />
      </Paper>
    </Box>
  );
};

export default Home;