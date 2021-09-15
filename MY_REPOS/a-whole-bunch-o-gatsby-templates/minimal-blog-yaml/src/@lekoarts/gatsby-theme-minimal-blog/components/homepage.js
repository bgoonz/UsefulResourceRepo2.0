/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Text } from '@theme-ui/components'
import { Link } from 'gatsby'
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout'
import Title from '@lekoarts/gatsby-theme-minimal-blog/src/components/title'
import Listing from '@lekoarts/gatsby-theme-minimal-blog/src/components/listing'
import List from '@lekoarts/gatsby-theme-minimal-blog/src/components/list'
import useMinimalBlogConfig from '@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config'
import replaceSlashes from '@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes'

const Homepage = ({ posts }) => {
  const { basePath, blogPath } = useMinimalBlogConfig()

  return (
    <Layout>
      <section sx={{ mb: [5, 6, 7], p: { fontSize: [1, 2, 3], mt: 2 } }}>
        <Text
          sx={{ fontSize: [4, 5, 6], fontWeight: `bold`, color: `heading` }}
        >
          Hi.
        </Text>
        <p>
          I'm Lupin - currently teaching "Defense against the Dark Arts" at
          Hogwarts, Great Britain. I recently published a book called{' '}
          <a href="https://www.lekoarts.de">Those nasty Dementors</a>. It
          teaches everything you need to know about defending against Dementors.
        </p>
      </section>
      <Title text="Latest Posts">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>
          Read all posts
        </Link>
      </Title>
      <Listing posts={posts} showTags={false} />
      <List>
        <Title text="Projects" />
        <ul>
          <li>
            <a href="https://www.lekoarts.de/en/projects/docma-award-super-short-story-telling-about-harry-potter">
              Super Short Story Telling: Harry Potter
            </a>
          </li>
          <li>
            <a href="https://www.lekoarts.de/en/projects/private-instagram-project-proprius">
              Instagram Project "Proprius"
            </a>
          </li>
        </ul>
      </List>
    </Layout>
  )
}

export default Homepage
