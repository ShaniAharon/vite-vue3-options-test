<template>
  <div v-if="todos" class="greetings">
    <button @click="toggleDarkMode">Toggle theme</button>
    <h1>Hi Todos</h1>

    <input
      type="text"
      placeholder="search"
      @input="filter"
      v-model="searchText"
    />
    <input type="text" v-model="todoToEdit.txt" />

    <button @click="save()">Add Todo</button>
    <button @click="sortBy('txt')">Sort by name</button>
    <button @click="sortBy('createdAt')">Sort by date</button>
    <todoList @remove="removeTodo" :todos="todos" />
  </div>
</template>

<script lang="ts">
  import todoList from '../components/todo-list.vue'
  import {todoService} from '../services/todo.service.js'
  interface Todo {
    id: string
    txt: string
    done: boolean
    createdAt: number
  }
  export default {
    name: 'TodoApp',
    components: {
      todoList,
    },
    data() {
      return {
        todoText: '',
        searchText: '',
        sortKey: '',
        // todos: null,
        todoToEdit: todoService.getEmptyTodo(),
      }
    },
    created() {
      // this.loadTodos();
    },
    methods: {
      filter() {
        this.todosToShow
      },
      // loadTodos() {
      //   todoService.query({}).then((projs) => {
      //     console.log(projs);
      //     this.todos = projs;
      //   });
      // },

      async save() {
        try {
          await this.$store.dispatch({
            type: 'saveTodo',
            todo: this.todoToEdit,
          })
          this.todoToEdit = todoService.getEmptyTodo()
        } catch (err) {
          console.log(err)
        }
      },
      removeTodo(todoId: string) {
        this.$store.dispatch({type: 'removeTodo', id: todoId})
      },
    },
    computed: {
      todosToShow() {
        if (this.searchText) {
          return this.todos.filter((t) => t.txt.includes(this.searchText))
        }
        const key = this.sortKey
        if (key) {
          return this.todos.sort((a, b) => {
            a = a[key]
            b = b[key]
            return a === b ? 0 : a > b ? 1 : -1
          })
        }
        return this.todos
      },
      todos(): Todo[] {
        return this.$store.getters.todos
      },
    },
    unmounted() {},
  }
</script>

<style>
  .main-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* margin: 0 auto; */
  }
</style>
