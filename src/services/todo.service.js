import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

const KEY = 'todoDB';

export const todoService = {
  query,
  getById,
  remove,
  save,
  getEmptyTodo,
};

// _createTodos();

// TODO: support paging and filtering and sorting
async function query() {
  console.log('runing');
  const todos = await storageService.query(KEY)
  console.log('todos service', todos);
  return todos.length ? todos : _createTodos() //storageService.query(KEY);
}

function getById(id) {
  return storageService.get(KEY, id);
}

function remove(id) {
  return storageService.remove(KEY, id);
}

function save(todo) {
  const savedTodo = todo._id
    ? storageService.put(KEY, todo)
    : storageService.post(KEY, todo);
  return savedTodo;
}

function getEmptyTodo(txt = 'do it', done = false) {
  return {
    _id: '',
    txt,
    done,
    createdAt: Date.now(),
  };
}

// Create Test Data:
function _createTodos() {
  var todos = JSON.parse(localStorage.getItem(KEY));
  if (!todos || !todos.length) {
    todos = [
      _createTodo('just do it'),
      _createTodo('yes you can'),
      _createTodo(),
    ];
    console.log('todos', todos);
    //todos saved as null find a solution
    localStorage.setItem(KEY, JSON.stringify(todos));
  }
  console.log('todos before send', todos);
  return todos;
}

function _createTodo(txt) {
  const todo = getEmptyTodo(txt);
  todo._id = utilService.makeId();
  return todo;
}
