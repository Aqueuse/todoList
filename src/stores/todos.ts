import { defineStore } from 'pinia';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    tasks: [] as Todo[],
    nextTaskId: 1, // Pour générer des ID uniques
  }),
  actions: {
    addTask(text: string) {
      this.tasks.push({
        id: this.nextTaskId++,
        text,
        done: false,
      });
    },
    toggleTaskCompletion(id: number) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].done = !this.tasks[taskIndex].done;
      }
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
});