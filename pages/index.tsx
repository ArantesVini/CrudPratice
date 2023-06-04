import { GlobalStyles } from "@ui/theme/GlobalStyles";
import React from "react";

const bg =
  "https://super.abril.com.br/wp-content/uploads/2021/08/SI_430_Lo-fi_site.png?w=1024&resize=1200,800";

const todos = [
  {
    id: "86c984c3-84c2-4a8b-a90a-6c6321a5f0da",
    date: "2023-06-04T13:11:03.088Z",
    content: "Second TODO updated.",
    done: true,
  },
];

/* eslint-disable space-before-function-paren */
function HomePage() {
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
          <input type="text" placeholder="Search for" />
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
            {todos.map((todo) => {
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

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>

            <tr>
              <td colSpan={4} align="center">
                Can&apos;t find any task
              </td>
            </tr>

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                <button data-type="load-more">
                  Load more{" "}
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
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default HomePage;
