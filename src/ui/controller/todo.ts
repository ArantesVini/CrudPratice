import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function get(params: TodoControllerGetParams) {
  return todoRepository.get({
    page: params.page,
    limit: 2,
  });
}

function filterTodosByContent<Todo>(
  search: string,
  todos: Array<Todo & { content: string }>,
): Todo[] {
  const homeTodos = todos.filter((todo) => {
    const searchNormalized = search.toLowerCase();
    const contentNormliazed = todo.content.toLowerCase();
    return contentNormliazed.includes(searchNormalized);
  });
  return homeTodos;
}

export const todoController = {
  get,
  filterTodosByContent,
};
