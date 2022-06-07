<template>
  <ul v-if="todos">
    <todoPreview
      :class="{dark: darkMode}"
      @remove="(todoId: string) => this.$emit('remove', todoId)"
      v-for="todo in todos"
      :todo="todo"
      :key="todo.id"
    />
  </ul>
</template>
<script lang="ts">
  import todoPreview from '../components/todo-preview.vue'
  interface Todo {
    id: string
    txt: string
    done: boolean
    createdAt: number
  }
  export default {
    name: 'TodoList',
    components: {todoPreview},
    props: {
      todos: [],
    },
    data() {
      return {}
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
  }
</script>
<style></style>
