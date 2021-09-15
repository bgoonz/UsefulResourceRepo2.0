/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout'
import SEO from '@lekoarts/gatsby-theme-minimal-blog/src/components/seo'

const Page = ({ data: { page } }) => (
  <Layout>
    <SEO title={page.title} description={page.excerpt} />
    <Styled.h2>{page.title}</Styled.h2>
    <section sx={{ my: 5 }}>{page.body}</section>
  </Layout>
)

export default Page
