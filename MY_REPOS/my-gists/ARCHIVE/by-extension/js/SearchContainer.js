import React from "react"
import * as styles from "./searchContainer.module.scss";

export default function SearchContainer() {
  const [search, setSearch] = useState(
    results: [{
      slug: "blog-1",
      title: "blog 1 title",
      subtitle: "blog 1 subtitle"
    }, {
      slug: "blog-2",
      title: "blog 2 title",
      subtitle: "blog 2 subtitle"
    }],
  })

  return (
    <div>
      <input
        style={{width: "200px"}}
        className="input"
        type="text"
        placeholder="Search" />
      { search.results.length > 0 &&
        <div
          className={`${styles.options} select is-multiple`}>
          <ul>
            { search.results.map(result => (
              <li
                role='presentation'
                key={result.slug}
                className={`${styles.option} p-2`}>
                <p className={`${styles.title}`}>{result.title}</p>
                <p className={`${styles.subtitle}`}>{result.subtitle}</p>
              </li>
            ))
            }
          </ul>
        </div>
      }
    </div>
  )
}