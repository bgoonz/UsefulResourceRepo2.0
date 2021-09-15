import * as React from 'react'
import { graphql, Link } from 'gatsby'

const Post = ({ data: { sanityPost: post } }) => {
  return (
    <React.Fragment>
      <header>
        <Link to="/">Go back home</Link>
      </header>
      <main>
        <h1>{post.title}</h1>
        <p>
          Published at {post.publishedAt} by {post.author.name}
        </p>
        <p>Categories:</p>
        <ul>
          {post.categories.map((cat) => (
            <li key={cat.title}>{cat.title}</li>
          ))}
        </ul>
        <div>{post.body[0].children[0].text}</div>
      </main>
    </React.Fragment>
  )
}

export default Post

export const query = graphql`
  query Post($slug__current: String!) {
    sanityPost(slug: { current: { eq: $slug__current } }) {
      author {
        name
      }
      body {
        children {
          text
        }
      }
      categories {
        title
      }
      publishedAt
      title
    }
  }
`
