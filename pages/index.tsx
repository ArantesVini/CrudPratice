import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoController } from "@ui/controller/todo";
import React from "react";
import { init } from "next/dist/compiled/@vercel/og/satori";

const bg =
  "https://super.abril.com.br/wp-content/uploads/2021/08/SI_430_Lo-fi_site.png?w=1024&resize=1200,800";

interface HomeTodo {
  id: string;
  content: string;
}

/* eslint-disable space-before-function-paren */
function HomePage() {
  const initialLoadComplete = React.useRef(false);
  const [totalPages, setTotalPages] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");

  const [page, setPage] = React.useState(1);
  const [todos, setTodos] = React.useState<HomeTodo[]>([]);
  const homeTodos = todoController.filterTodosByContent<HomeTodo>(
    search,
    todos,
  );

  const hasMoresPages = totalPages > page;
  const hasNoTodos = homeTodos.length === 0 && !isLoading;

  React.useEffect(() => {
    if (!initialLoadComplete.current) {
      todoController
        .get({ page })
        .then(({ todos, pages }) => {
          setTodos(todos);
          setTotalPages(pages);
        })
        .finally(() => {
          setIsLoading(false);
          initialLoadComplete.current = true;
        });
    }
  }, []);

  return (
    <main>
      <GlobalStyles themeName="indigo" />
      <header
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className="typewriter">
          <h1>What is your next task?</h1>
        </div>
        <form>
          <input type="text" placeholder="Go to the gym, Do the dishes..." />
          <button type="submit" aria-label="Add new task">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input
            type="text"
            value={search}
            placeholder="Search for"
            onChange={function handlSearch(event) {
              setSearch(event.target.value);
            }}
          />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Task</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {homeTodos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{todo.content}</td>
                  <td align="right">
                    <button data-type="delete">Delete</button>
                  </td>
                </tr>
              );
            })}

            {isLoading && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            )}

            {hasNoTodos && (
              <tr>
                <td colSpan={4} align="center">
                  Can&apos;t find any TODO
                </td>
              </tr>
            )}

            {hasMoresPages && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  <button
                    data-type="load-more"
                    onClick={() => {
                      setIsLoading(true);
                      const nextPage = page + 1;
                      setPage(nextPage);
                      todoController
                        .get({ page: nextPage })
                        .then(({ todos, pages }) => {
                          setTodos((oldTodos) => {
                            return [...oldTodos, ...todos];
                          });
                          setTotalPages(pages);
                        })
                        .finally(() => {
                          setIsLoading(false);
                        });
                    }}
                  >
                    Page {page} - Load more{" "}
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        fontSize: "1.2em",
                      }}
                    >
                      ↓
                    </span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default HomePage;
