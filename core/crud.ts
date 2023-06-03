// const fs = require("fs");
import fs from "fs";
const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

interface Todo {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string) {
  const todo: Todo = {
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
  return content;
}
function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    return [];
  }
  return db.todos;
}
function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// Create
CLEAR_DB();
create("First TODO;");
create("Second TODO;");
// Read
console.log(read());
// Update

// Delete
