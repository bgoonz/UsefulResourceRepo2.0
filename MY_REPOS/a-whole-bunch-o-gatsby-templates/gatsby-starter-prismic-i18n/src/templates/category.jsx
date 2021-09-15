/* eslint react/destructuring-assignment: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { Listing, Wrapper, Title, SEO, Header } from '../components'
import website from '../../config/website'
import { LocaleContext } from '../components/Layout'
import LocalizedLink from '../components/LocalizedLink'

const Hero = styled.header`
  background-color: ${props => props.theme.colors.primary};
  padding-top: 1rem;
  padding-bottom: 4rem;
  h1 {
    color: ${props => props.theme.colors.bg};
  }
`

const Headline = styled.p`
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  color: ${props => props.theme.colors.greyBlue};
  font-size: 1.25rem;
  a {
    font-style: normal;
    font-weight: normal;
  }
`

const CatWrapper = Wrapper.withComponent('main')

const LocaleSwitcherStyle = theme => css`
  [data-name='locale-switcher'] {
    color: ${theme.colors.greyBlue};
    a {
      color: white;
    }
  }
`

const Category = ({
  pageContext: { category, locale },
  data: {
    posts: { edges, totalCount },
  },
  location,
}) => {
  const lang = React.useContext(LocaleContext)
  const i18n = lang.i18n[lang.locale]

  return (
    <>
      <Global styles={LocaleSwitcherStyle} />
      <SEO
        title={`${i18n.category}: ${category} | ${i18n.defaultTitleAlt}`}
        pathname={location.pathname}
        locale={locale}
      />
      <Hero>
        <Wrapper>
          <Header invert />
          <Headline>{i18n.category}</Headline>
          <h1>{category}</h1>
        </Wrapper>
      </Hero>
      <CatWrapper id={website.skipNavId}>
        <Title style={{ marginTop: '4rem' }}>
          {totalCount} {totalCount === 1 ? 'Post' : 'Posts'} {totalCount === 1 ? i18n.was : i18n.were} {i18n.tagged} "
          {category}" – <LocalizedLink to="/categories">{i18n.allCategories}</LocalizedLink>
        </Title>
        <Listing posts={edges} />
      </CatWrapper>
    </>
  )
}

export default Category

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query CategoryPage($category: String!, $locale: String!) {
    posts: allPrismicPost(
      sort: { fields: [data___date], order: DESC }
      filter: {
        data: {
          categories: { elemMatch: { category: { document: { elemMatch: { data: { name: { eq: $category } } } } } } }
        }
        lang: { eq: $locale }
      }
    ) {
      totalCount
      edges {
        node {
          uid
          data {
            title {
              text
            }
            date(formatString: "DD.MM.YYYY")
            categories {
              category {
                document {
                  data {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
