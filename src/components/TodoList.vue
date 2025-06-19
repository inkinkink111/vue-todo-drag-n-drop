<script setup lang="ts">
import { computed } from "vue";
import TodoListCard from "./TodoListCard.vue";
import { useTodoStore } from "../store/store";
import { storeToRefs } from "pinia";

const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);
const todoList = computed(() => todos.value.filter((todo) => !todo.isDone));
const doneList = computed(() => todos.value.filter((todo) => todo.isDone));

const toggleHandler = (id: number) => {
  todoStore.toggleDone(id);
};

const dropHandler = (event: DragEvent, target: "todo" | "done") => {
  const itemId = Number(event.dataTransfer?.getData("id"));
  const item = todos.value.find((todo) => todo.id === itemId);
  if (!item) return;
  const isCurrentlyDone = item.isDone;
  if (target === "done" && isCurrentlyDone) return;
  if (target === "todo" && !isCurrentlyDone) return;
  todoStore.toggleDone(itemId);
};
</script>

<template>
  <section
    class="grid grid-cols-2 gap-2 w-full h-full max-h-[600px] max-w-[1024px] border border-white rounded-2xl p-4"
  >
    <div
      class="todo flex flex-col justify-start items-center gap-4 h-full max-h-[568px]"
    >
      <h2 class="text-white font-mono font-bold text-lg">Todo</h2>
      <div
        class="item-container w-full h-full bg-gray-800 rounded-2xl overflow-auto p-4 flex flex-col gap-2 scrollbar-custom"
        @drop="dropHandler($event, 'todo')"
        @dragover.prevent
        @dragenter.prevent
      >
        <TodoListCard
          v-for="item in todoList"
          :key="item.id"
          :text="item.text"
          :create-at="item.createAt"
          :is-done="item.isDone"
          :id="item.id"
          @toggle-type="toggleHandler"
        />
      </div>
    </div>
    <div class="done flex flex-col justify-start items-center gap-4">
      <h2 class="text-white font-mono font-bold text-lg">Done</h2>
      <div
        class="item-container w-full h-full bg-gray-800 rounded-2xl overflow-auto p-4 flex flex-col gap-2 scrollbar-custom"
        @drop="dropHandler($event, 'done')"
        @dragover.prevent
        @dragenter.prevent
      >
        <TodoListCard
          v-for="item in doneList"
          :key="item.id"
          :text="item.text"
          :create-at="item.createAt"
          :is-done="item.isDone"
          :id="item.id"
          @toggle-type="toggleHandler"
        />
      </div>
    </div>
  </section>
</template>
