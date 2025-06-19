import { defineStore } from "pinia";
import { ref } from "vue";
import type { TodoModel } from "../models/todoModel";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<TodoModel[]>([]);

  function addTodo(todo: TodoModel) {
    todos.value.push(todo);
  }

  function toggleDone(id: number) {
    const todo = todos.value.find((todo) => todo.id === Number(id));
    if (todo) {
      todo.isDone = !todo.isDone;
    }
  }

  return { todos, addTodo, toggleDone };
});
