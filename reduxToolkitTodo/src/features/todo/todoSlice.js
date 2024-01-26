import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  // todos: [{ id: 1, todo: "hello", completed: false }],//sample
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        todo: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      console.log("action.payload", action.payload);
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },

    updateTodo: (state, action) => {
      state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );
    },
  },
});

export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
