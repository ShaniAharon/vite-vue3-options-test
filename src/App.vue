<template>
  <div id="app">
    <todoApp />
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'
  import todoApp from './views/todo-app.vue'
  export default defineComponent({
    data() {
      return {}
    },
    created() {
      this.$store.dispatch({type: 'loadTodos'})
    },
    methods: {},
    components: {
      todoApp,
    },
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
