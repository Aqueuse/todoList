<script setup lang="ts">
import TodoListView from '@/components/TodoListComponent.vue'
</script>

<template>
  <main>
    <TodoListView />

    <router-link to="/about">About</router-link>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
});
</script>