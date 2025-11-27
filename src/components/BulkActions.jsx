import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodoAsync, deleteTodoAsync } from '../store/slices/todoSlice';
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import {
  DeleteSweep as ClearIcon,
  CheckBox as CheckAllIcon,
  CheckBoxOutlineBlank as UncheckAllIcon
} from '@mui/icons-material';
import { useState } from 'react';

const BulkActions = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.todos);
  const [openDialog, setOpenDialog] = useState(false);

  const completedTodos = items.filter(todo => todo.completed);
  const activeTodos = items.filter(todo => !todo.completed);
  const allCompleted = items.length > 0 && items.every(todo => todo.completed);
  const hasCompleted = completedTodos.length > 0;

  const handleToggleAll = () => {
    const targetState = !allCompleted;
    items.forEach(todo => {
      if (todo.completed !== targetState) {
        dispatch(toggleTodoAsync(todo.id));
      }
    });
  };

  const handleClearCompleted = () => {
    completedTodos.forEach(todo => {
      dispatch(deleteTodoAsync(todo.id));
    });
    setOpenDialog(false);
  };

  const openClearDialog = () => {
    if (hasCompleted) {
      setOpenDialog(true);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
        <Typography variant="body2" color="text.secondary">
          {activeTodos.length} активных, {completedTodos.length} выполненных
        </Typography>
        
        <Box display="flex" gap={1}>
          {items.length > 0 && (
            <Button
              startIcon={allCompleted ? <UncheckAllIcon /> : <CheckAllIcon />}
              onClick={handleToggleAll}
              size="small"
              variant="outlined"
            >
              {allCompleted ? 'Снять все' : 'Выполнить все'}
            </Button>
          )}
          
          {hasCompleted && (
            <Button
              startIcon={<ClearIcon />}
              onClick={openClearDialog}
              size="small"
              variant="outlined"
              color="error"
            >
              Удалить выполненные ({completedTodos.length})
            </Button>
          )}
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          Удалить выполненные задачи?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить {completedTodos.length} выполненных задач? 
            Это действие нельзя отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Отмена
          </Button>
          <Button onClick={handleClearCompleted} color="error" variant="contained">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BulkActions;