import { todoService } from '../../services/todo.service.js';
// import { socketService } from '../../services/socket.service.js';
export default {
    state: {
        todos: null,
        filterBy: null,
        isLoading: false,
        // msgs: []
    },
    getters: {
        todos(state) {
            console.log('getter state.todos', state.todos);
            console.log(' getter state', state);
            return state.todos;
        },
        getLabels(state) {
            return state.labels;
        },
        isLoading(state) {
            return state.isLoading;
        },
    },
    mutations: {
        setTodos(state, { todos }) {
            console.log('set todos', todos);
            state.todos = todos;
            console.log('state mutate todos', { ...state.todos });
        },
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        removeTodo(state, { id }) {
            const idx = state.todos.findIndex((todo) => todo._id === id);
            state.todos.splice(idx, 1);
        },
        saveTodo(state, { todo }) {
            const idx = state.todos.findIndex(
                (currTodo) => currTodo._id === todo._id
            );
            if (idx !== -1) state.todos.splice(idx, 1, todo);
            else state.todos.unshift(todo);
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
    },
    actions: {
        async loadTodos({ commit, state }) {
            // commit({type: 'setIsLoading', isLoading: true});
            try {
                // var todos = await todoService.query(state.filterBy);
                var todos = await todoService.query();
                commit({ type: 'setTodos', todos });
            } catch (err) {
                console.error('Cannot Load todos', err);
                throw err;
            }
            // finally {
            //   commit({type: 'setIsLoading', isLoading: false});
            // }
        },
        async removeTodo({ commit }, { id }) {
            try {
                await todoService.remove(id);
                commit({ type: 'removeTodo', id });
            } catch (err) {
                console.error('Cannot remove todo', err);
                throw err;
            }
        },
        async getToyById(context, { todoId }) {
            try {
                return await todoService.getToyById(todoId);
            } catch (err) {
                console.log(err);
            }
        },
        async saveTodo({ commit }, { todo }) {
            try {
                const msgTxt = todo._id ? 'Todo updated' : 'Todo added';
                var todo = await todoService.save(todo);
                // socketService.emit('msg watched users', msgTxt);
                commit({ type: 'saveTodo', todo });
            } catch (err) {
                console.error('Cannot Edit/Add todo', err);
                throw err;
            }
        },
        filter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            dispatch({ type: 'loadTodos' });
        },
    },
};
