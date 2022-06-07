<template>
  <li>
    <pre :class="{done: todo!.done, dark:darkMode}">{{ todo }}</pre>
    <div class="btns-container">
      <button @click="removeTodo(todo!.id)">Delete</button>
      <button @click="toggleDone()">Done</button>
    </div>
  </li>
</template>
<script lang="ts">
  import {inject} from 'vue'

  export default {
    name: 'TodoList',
    components: {},
    props: {
      todo: Object,
    },
    data() {
      return {
        darkMode: '',
      }
    },
    created() {
      // this.darkMode = inject('dark-mode')
    },
    methods: {
      toggleDone(): void {
        // const todo: Todo | undefined = todos.value.find((t) => t.id === todoId)
        this.todo!.done = !this.todo?.done // to fix Object is possibly 'undefined'
      },
      removeTodo(todoId: string): void {
        this.$emit('remove', todoId)
      },
    },
    computed: {},
    unmounted() {},
  }
</script>
<style></style>
