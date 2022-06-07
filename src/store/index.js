import { createStore } from 'vuex';
import todoStore from './modules/todo-store.js';

const store = createStore({
    strict: true,
    modules: {
        todoStore,
    },
});

export default store;
