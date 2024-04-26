import { expect, test, describe, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils';
import { useTodoListStore } from '../stores/todos'
import TodoListView from '../components/TodoListComponent.vue'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

// add a task       effectively add a task in tasks object with correct id
// remove a task    effectively remove the task in tasks object
// validate a task  effectively mark a task as completed in taks object


let wrapper = mount(TodoListView, {
    global: {
      plugins: [createTestingPinia()],
    },
  })

describe('store testing', () => {
    beforeEach( () => {
        wrapper = mount(TodoListView, {
            global: {
              plugins: [createTestingPinia()],
            },
          })
        });

    test('effectively add a task in the store', () => {
        let todoStore = useTodoListStore();
        let testTask = 'test value';

        todoStore.addTask(testTask);
        
        const task = todoStore.tasks.find(task => task.text == testTask);
        expect(task).toBeDefined;
    });

    test('effectively remove a task from the store', () => {
        let todoStore = useTodoListStore();
        let testTask = 'test value';

        let addedTaskId = todoStore.addTask(testTask);
        todoStore.removeTask(addedTaskId);
        
        const taskExists = todoStore.tasks.find(task => task.id == addedTaskId) !== undefined;
        expect(taskExists).toBe(false);
    });

    test('effectively mark a task as completed in the store', () => {
        let todoStore = useTodoListStore();
        let testTask = 'test value';

        let addedTaskId = todoStore.addTask(testTask);
        todoStore.completeTask(addedTaskId);
        
        const addedTask = todoStore.tasks.find(task => task.id == addedTaskId);
        expect(addedTask?.done);
    });
})