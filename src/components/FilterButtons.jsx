import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, selectTodosCounts } from '../store/slices/todoSlice';
import { ToggleButtonGroup, ToggleButton, Box, Typography, Chip } from '@mui/material';
import {
  AllInbox as AllIcon,
  RadioButtonUnchecked as ActiveIcon,
  CheckCircle as CompletedIcon
} from '@mui/icons-material';

const FilterButtons = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.todos);
  const counts = useSelector(selectTodosCounts);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" component="h2">
          Фильтры
        </Typography>
        <Box display="flex" gap={1}>
          <Chip 
            label={`Все: ${counts.all}`} 
            size="small" 
            color="primary" 
            variant={filter === 'all' ? 'filled' : 'outlined'}
          />
          <Chip 
            label={`Активные: ${counts.active}`} 
            size="small" 
            color="secondary" 
            variant={filter === 'active' ? 'filled' : 'outlined'}
          />
          <Chip 
            label={`Выполненные: ${counts.completed}`} 
            size="small" 
            color="success" 
            variant={filter === 'completed' ? 'filled' : 'outlined'}
          />
        </Box>
      </Box>
      
      <ToggleButtonGroup
        value={filter}
        onChange={handleFilterChange}
        exclusive
        fullWidth
        color="primary"
      >
        <ToggleButton value="all" sx={{ py: 1.5 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <AllIcon fontSize="small" />
            <Typography variant="body2">Все</Typography>
            <Chip label={counts.all} size="small" variant="outlined" />
          </Box>
        </ToggleButton>
        
        <ToggleButton value="active" sx={{ py: 1.5 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <ActiveIcon fontSize="small" />
            <Typography variant="body2">Активные</Typography>
            <Chip label={counts.active} size="small" color="secondary" variant="outlined" />
          </Box>
        </ToggleButton>
        
        <ToggleButton value="completed" sx={{ py: 1.5 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <CompletedIcon fontSize="small" />
            <Typography variant="body2">Выполненные</Typography>
            <Chip label={counts.completed} size="small" color="success" variant="outlined" />
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default FilterButtons;