// const fs = require("fs");
import fs from "fs";
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./core/db";

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };
  const todos: Array<Todo> = [...read(), todo];
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2,
    ),
  );
  return todo;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }
  return db.todos;
}

function update(id: UUID, partialTodo: Partial<Todo>) {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  if (!updatedTodo) {
    throw new Error(`Todo with id ${id} not found`);
  }
  return updatedTodo;
}

function updateContentById(content: string, id: UUID): Todo {
  return update(id, { content });
}

function updateStatusById(done: boolean, id: UUID): Todo {
  return update(id, { done });
}

function deleteById(id: UUID) {
  const todos = read();
  const todosWIthoutOne = todos.filter((todo) => {
    if (id === todo.id) {
      return false;
    }
    return true;
  });
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos: todosWIthoutOne }, null, 2),
  );
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// Create
CLEAR_DB();
const firstTodo = create("First TODO;");
const secondTodo = create("Second TODO;");

// Read
console.log(read());

// Update
updateContentById("Second TODO updated.", secondTodo.id);
updateStatusById(true, secondTodo.id);
let todos = read();
console.log(todos.length, "todos");
console.log(read());

// Delete
deleteById(firstTodo.id);
todos = read();
console.log(todos.length, "todos after delete");
console.log(todos);
