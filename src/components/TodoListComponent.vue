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

  // completeTask is done "reactively"

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
        <el-input id="todoTextInput" v-model="newTodo" required placeholder="new todo" />
      </el-form-item>
      <el-form-item>
        <el-button id="todoAdd" @click="addTodo()">Add Todo</el-button>
      </el-form-item>
    </el-form>
    <div v-for="todo in todoStore.tasks" :key="todo.id">
        <div class="taskContainer">
          <el-checkbox class="todoCheckBox" v-model="todo.done" value="large" />
        <el-text :class="['todoText', 'mx-1', todo.done ? 'done': 'undone']">{{ todo.text }}</el-text>
        <button class="delete" @click="removeTodo(todo.id)">X</button>
        </div>
    </div>
  </el-main>
</template>


<style>
.addTask {
  display: flex;
  justify-content: center;
}

.taskContainer {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
}

.done {
  text-decoration: line-through;
}

.todoText {  
  display: inline-block;
  max-width: 10vw;
  overflow: hidden;
  white-space: nowrap;
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
