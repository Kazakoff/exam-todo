import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  toggleTodoAsync, 
  deleteTodoAsync, 
  updateTodoAsync,
  toggleTodoLocal 
} from '../store/slices/todoSlice';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  TextField,
  Box,
  CircularProgress
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.todos);

  const handleToggle = () => {
    // Оптимистичное обновление для мгновенного отклика
    dispatch(toggleTodoLocal(todo.id));
    
    // Асинхронное обновление на сервере
    dispatch(toggleTodoAsync(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodoAsync(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      dispatch(updateTodoAsync({ id: todo.id, text: editText.trim() }));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <ListItem
      sx={{
        border: 1,
        borderColor: 'grey.200',
        borderRadius: 1,
        mb: 1,
        bgcolor: 'background.paper',
        opacity: todo.pending ? 0.6 : 1
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Checkbox
          checked={todo.completed}
          onChange={handleToggle}
          color="primary"
          disabled={loading}
        />
        {todo.pending && (
          <CircularProgress 
            size={20} 
            sx={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-10px',
              marginLeft: '-10px'
            }} 
          />
        )}
      </Box>
      
      {isEditing ? (
        <TextField
          fullWidth
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
          size="small"
          sx={{ ml: 1 }}
        />
      ) : (
        <ListItemText
          primary={todo.text}
          sx={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'text.secondary' : 'text.primary',
            ml: 1
          }}
        />
      )}
      
      <ListItemSecondaryAction>
        <Box display="flex" gap={1}>
          {isEditing ? (
            <>
              <IconButton onClick={handleSave} color="primary" size="small" disabled={loading}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancel} color="secondary" size="small" disabled={loading}>
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={handleEdit} color="primary" size="small" disabled={loading}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} color="error" size="small" disabled={loading}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;