import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { todoAPI } from '../../services/api';

// Асинхронные thunks
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await todoAPI.getTodos();
    return response;
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async (text) => {
    const response = await todoAPI.addTodo(text);
    return response;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodo',
  async (id) => {
    const response = await todoAPI.toggleTodo(id);
    if (!response) {
      throw new Error('Todo not found');
    }
    return response;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    await todoAPI.deleteTodo(id);
    return id;
  }
);

export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, text }) => {
    const response = await todoAPI.updateTodo(id, { text });
    if (!response) {
      throw new Error('Todo not found');
    }
    return response;
  }
);

export const clearCompletedAsync = createAsyncThunk(
  'todos/clearCompleted',
  async () => {
    const response = await todoAPI.clearCompleted();
    return response;
  }
);

export const toggleAllAsync = createAsyncThunk(
  'todos/toggleAll',
  async (completed) => {
    const response = await todoAPI.toggleAll(completed);
    return response;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filter: 'all' // 'all', 'active', 'completed'
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // Локальный toggle для мгновенного отклика
    toggleTodoLocal: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add todo
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Toggle todo
      .addCase(toggleTodoAsync.pending, (state, action) => {
        // Можно добавить индикатор загрузки для конкретной задачи
        const todo = state.items.find(t => t.id === action.meta.arg);
        if (todo) {
          todo.pending = true;
        }
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(toggleTodoAsync.rejected, (state, action) => {
        state.error = action.error.message;
        // Откатываем локальное изменение при ошибке
        const todo = state.items.find(t => t.id === action.meta.arg);
        if (todo) {
          todo.completed = !todo.completed;
          todo.pending = false;
        }
      })
      // Delete todo
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      })
      // Update todo
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Clear completed
      .addCase(clearCompletedAsync.fulfilled, (state) => {
        state.items = state.items.filter(todo => !todo.completed);
      })
      // Toggle all
      .addCase(toggleAllAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  }
});

export const { clearError, setFilter, toggleTodoLocal } = todoSlice.actions;

// Селекторы
export const selectFilteredTodos = (state) => {
  const { items, filter } = state.todos;
  switch (filter) {
    case 'active':
      return items.filter(todo => !todo.completed);
    case 'completed':
      return items.filter(todo => todo.completed);
    default:
      return items;
  }
};

export const selectTodosCounts = (state) => {
  const items = state.todos.items;
  return {
    all: items.length,
    active: items.filter(todo => !todo.completed).length,
    completed: items.filter(todo => todo.completed).length
  };
};

export default todoSlice.reducer;