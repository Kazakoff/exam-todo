import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, selectFilteredTodos } from '../store/slices/todoSlice';
import TodoItem from './TodoItem';
import {
  List,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';

const TodoList = () => {
  const dispatch = useDispatch();
  const { loading, error, filter } = useSelector(state => state.todos);
  const filteredTodos = useSelector(selectFilteredTodos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const getEmptyMessage = () => {
    switch (filter) {
      case 'active':
        return 'Нет активных задач. Все задачи выполнены!';
      case 'completed':
        return 'Нет выполненных задач. Выполните хотя бы одну задачу!';
      default:
        return 'Нет задач. Добавьте первую задачу!';
    }
  };

  if (loading && filteredTodos.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Ошибка: {error}
      </Alert>
    );
  }

  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Список задач ({filteredTodos.length})
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
          {filter === 'all' && '(все)'}
          {filter === 'active' && '(активные)'}
          {filter === 'completed' && '(выполненные)'}
        </Typography>
      </Typography>
      
      {filteredTodos.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary" variant="body1">
            {getEmptyMessage()}
          </Typography>
        </Box>
      ) : (
        <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      )}
      
      {loading && filteredTodos.length > 0 && (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Paper>
  );
};

export default TodoList;