async function get() {
  return fetch("api/todos").then(async (serverResponse) => {
    const stringTodos = await serverResponse.text();
    const todosFromServer = JSON.parse(stringTodos).todos;
    return todosFromServer;
  });
}

export const todoController = {
  get,
};
