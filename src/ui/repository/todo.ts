interface TodoRepositoryGetParams {
  page: number;
  limit: number;
}
interface TodoRepositoryGetOutput {
  todos: Array<Todo>;
  total: number;
  pages: number;
}

function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  return fetch("api/todos").then(async (serverResponse) => {
    const todosString = await serverResponse.text();
    const todosFromServer = JSON.parse(todosString).todos;
    const ALL_TODOS = todosFromServer;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_TODOS.length / limit);
    return {
      todos: paginatedTodos,
      total: ALL_TODOS.lenght,
      pages: totalPages,
    };
  });
}

export const todoRepository = {
  get,
};

interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}
