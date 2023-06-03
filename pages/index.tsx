import { GlobalStyles } from "../src/theme/GlobalStyles";

const bg =
  "https://super.abril.com.br/wp-content/uploads/2021/08/SI_430_Lo-fi_site.png?w=1024&resize=1200,800";

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
              <th align="left">Id</th>
              <th align="left">Content</th>
              <th />
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>d4f26</td>
              <td>
                Todo content Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Eaque vero facilis obcaecati, autem aliquid eius!
                Consequatur eaque doloribus laudantium soluta optio odit,
                provident, ab voluptates doloremque voluptas recusandae
                aspernatur aperiam.
              </td>
              <td align="right">
                <button data-type="delete">Delete</button>
              </td>
            </tr>

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>

            <tr>
              <td colSpan={4} align="center">
                Can't find any task
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
