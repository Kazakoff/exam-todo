import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../store/slices/todoSlice';
import {
  TextField,
  Button,
  Box,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodoAsync(text.trim()));
      setText('');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Добавить новую задачу..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            disabled={!text.trim()}
          >
            Добавить
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddTodo;