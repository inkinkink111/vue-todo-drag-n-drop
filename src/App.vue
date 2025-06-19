<script setup lang="ts">
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
</script>

<template>
  <div class="bg-gray-900 w-screen h-screen">
    <main
      class="container w-full h-full mx-auto flex flex-col justify-center items-center py-8 px-4 md:px-0"
    >
      <h1 class="text-4xl text-white font-mono font-bold text-center">
        Vue Todo drag-n-drop!
      </h1>
      <TodoInput />
      <TodoList />
    </main>
  </div>
</template>

<style scoped></style>
