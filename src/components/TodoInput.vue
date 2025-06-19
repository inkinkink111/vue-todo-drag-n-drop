<script setup lang="ts">
import { useTodoStore } from "../store/store";
import type { TodoModel } from "../models/todoModel";
import { ref } from "vue";

const todoStore = useTodoStore();
const task = ref("");
const addToStoreHandler = () => {
  const temp: TodoModel = {
    id: Date.now(),
    text: task.value,
    isDone: false,
    createAt: new Date(),
  };
  todoStore.addTodo(temp);
  task.value = "";
};
</script>

<template>
  <section class="flex gap-2 my-5 w-full max-w-[600px]">
    <input
      v-model="task"
      class="w-full py-2 px-2 border border-amber-50 rounded-md text-white font-mono"
      type="text"
      placeholder="Type your task here..."
    />
    <button
      class="whitespace-nowrap p-2 rounded-lg bg-green-400 font-mono font-semibold cursor-pointer transition duration-300 ease-linear hover:bg-green-600"
      @click="addToStoreHandler"
    >
      Add Task!
    </button>
  </section>
</template>

<style scoped></style>
