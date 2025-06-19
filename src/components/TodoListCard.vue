<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{ (e: "toggleType", id: number): void }>();

const toggle = (id: number) => {
  emit("toggleType", id);
};

const startDrag = (event: DragEvent, id: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer?.setData("id", id.toString());
  }
};
</script>

<template>
  <div
    class="flex flex-col gap-2 rounded-xl p-4 w-full cursor-grab"
    :class="isDone ? 'bg-green-500' : 'bg-indigo-400'"
    draggable="true"
    @dragstart="startDrag($event, id)"
  >
    <p
      class="text-white font-mono font-semibold text-lg w-full break-all"
      :class="isDone ? 'line-through' : ''"
    >
      {{ text }}
    </p>
    <div class="flex flex-row justify-between items-center">
      <p class="text-white font-mono text-sm">
        {{ createAt.toLocaleString() }}
      </p>
      <button
        class="font-mono font-semibold text-sm bg-white rounded-2xl py-1 px-2 cursor-pointer"
        @click="toggle(id)"
      >
        {{ isDone ? "Toggle Todo" : "Toggle Done" }}
      </button>
    </div>
  </div>
</template>
