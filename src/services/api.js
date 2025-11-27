// Заглушка для бэкенда
let todos = [
  { id: 1, text: 'Изучить React', completed: true },
  { id: 2, text: 'Изучить Redux Toolkit', completed: false },
  { id: 3, text: 'Создать Todo приложение', completed: false }
];

let nextId = 4;

// Имитация задержки сети
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Функция для глубокого копирования объекта
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export const todoAPI = {
  async getTodos() {
    await delay(500);
    return deepClone(todos);
  },

  async addTodo(text) {
    await delay(300);
    const newTodo = {
      id: nextId++,
      text,
      completed: false
    };
    todos.push(newTodo);
    return deepClone(newTodo);
  },

  async toggleTodo(id) {
    await delay(200);
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex !== -1) {
      // Создаем новый объект вместо мутации
      const updatedTodo = {
        ...todos[todoIndex],
        completed: !todos[todoIndex].completed
      };
      todos[todoIndex] = updatedTodo;
      return deepClone(updatedTodo);
    }
    return null;
  },

  async deleteTodo(id) {
    await delay(200);
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
    return id;
  },

  async updateTodo(id, updates) {
    await delay(300);
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex !== -1) {
      const updatedTodo = {
        ...todos[todoIndex],
        ...updates
      };
      todos[todoIndex] = updatedTodo;
      return deepClone(updatedTodo);
    }
    return null;
  },

  async clearCompleted() {
    await delay(300);
    const completedIds = todos.filter(t => t.completed).map(t => t.id);
    todos = todos.filter(t => !t.completed);
    return completedIds;
  },

  async toggleAll(completed) {
    await delay(400);
    todos = todos.map(todo => ({
      ...todo,
      completed
    }));
    return deepClone(todos);
  }
};