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
  <el-header class="titleContainer">
    <el-text class="title">Todo list</el-text>
  </el-header>

  <el-main>
    <el-form class="addTask" @submit.prevent="addTodo">
      <el-form-item>
        <el-input v-model="newTodo" required placeholder="new todo" />
      </el-form-item>
      <el-form-item>
        <el-button @click="addTodo()">Add Todo</el-button>
      </el-form-item>
    </el-form>
    <div v-for="todo in todoStore.tasks" :key="todo.id">
        <div class="tasksContainer">
          <el-checkbox v-model="todo.done" value="large" />
        <el-text :class="['todoText', 'mx-1', todo.done ? 'done': 'undone']">{{ todo.text }}</el-text>
        <el-button @click="removeTodo(todo.id)">X</el-button>
        </div>
    </div>
  </el-main>
</template>


<style>
.addTask {
  display: flex;
  justify-content: center;
}

.tasksContainer {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
}

.done {
  text-decoration: line-through;
}

.todoText {  
  display: inline-block; /* Allow text to wrap on multiple lines */
  max-width: 10vw; /* Set maximum width for the container */
  overflow: hidden; /* Hide overflowing text */
  white-space: nowrap; /* Prevent text from wrapping within the container */
  text-overflow: ellipsis;
  padding: 0vw 1vw 0vw 1vw;
}

.titleContainer {
  text-align: center;
}

.title {
  font-size: 2em;
  font-weight: bold;
  color: #333;
}
</style>
