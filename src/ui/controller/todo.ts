import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function get(params: TodoControllerGetParams = {}) {
  return todoRepository.get({
    page: 1,
    limit: 10,
  });
}

export const todoController = {
  get,
};
