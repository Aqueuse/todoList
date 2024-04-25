<script setup lang="ts">
import { ref } from 'vue'
import { useTodoListStore } from '../stores/todos'

const todoStore = useTodoListStore()

const newTodo = ref('')

function addTodo() {
    if (newTodo.value.trim()) {
        todoStore.addTask(newTodo.value)
        newTodo.value = ''
    }
}

function removeTodo(id : number) {
    todoStore.removeTask(id)
}
</script>

<template>
  <h1>Todo list</h1>

  <div>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" required placeholder="new todo" />
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="todo in todoStore.tasks" :key="todo.id">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
