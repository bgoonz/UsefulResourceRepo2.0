import * as React from 'react'
import { graphql, Link } from 'gatsby'

const Index = ({ data }) => {
  return (
    <React.Fragment>
      <div style={{ padding: '2rem' }}>
        <header>My awesome blog</header>
        <main>
          <h1>Normal</h1>
          <ul>
            {data.posts.nodes.map((post) => (
              <li key={post.title}>
                <Link to={`/${post.slug.current}`}>
                  "{post.title}" by {post.author.name}
                </Link>
                <div>Published on {post.publishedAt}</div>
              </li>
            ))}
          </ul>
        </main>
        <footer>Please stay here!</footer>
      </div>
    </React.Fragment>
  )
}

export default Index

export const query = graphql`
  {
    posts: allSanityPost {
      nodes {
        title
        author {
          name
        }
        publishedAt(formatString: "DD.MM.YYYY")
        slug {
          current
        }
      }
    }
  }
`
