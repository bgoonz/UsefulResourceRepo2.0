/* eslint react/destructuring-assignment: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { kebabCase } from 'lodash'
import { graphql } from 'gatsby'
import { Global, css } from '@emotion/core'
import { SEO, Wrapper, Header, Title } from '../components'
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

const List = styled.div`
  margin-top: 3rem;
  a {
    display: block;
    font-size: 1.25rem;
    margin: 1rem 0;
  }
`

const LocaleSwitcherStyle = theme => css`
  [data-name='locale-switcher'] {
    color: ${theme.colors.greyBlue};
    a {
      color: white;
    }
  }
`

const CatWrapper = Wrapper.withComponent('main')

const Categories = ({ location, data: { categories }, pageContext: { locale } }) => {
  const lang = React.useContext(LocaleContext)
  const i18n = lang.i18n[lang.locale]

  return (
    <>
      <Global styles={LocaleSwitcherStyle} />
      <SEO title={`${i18n.allCategories} | ${i18n.defaultTitleAlt}`} pathname={location.pathname} locale={locale} />
      <Hero>
        <Wrapper>
          <Header invert />
          <h1>{i18n.allCategories}</h1>
        </Wrapper>
      </Hero>
      <CatWrapper>
        <Title style={{ marginTop: '4rem' }}>
          {categories.totalCount} {i18n.entries}
        </Title>
        <List>
          {categories.edges.map(cat => (
            <LocalizedLink key={cat.node.data.name} to={`/categories/${kebabCase(cat.node.data.name)}`}>
              {cat.node.data.name}
            </LocalizedLink>
          ))}
        </List>
      </CatWrapper>
    </>
  )
}

export default Categories

Categories.propTypes = {
  data: PropTypes.shape({
    categories: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query CategoriesOverview($locale: String!) {
    categories: allPrismicCategory(filter: { lang: { eq: $locale } }, sort: { fields: [data___name], order: ASC }) {
      totalCount
      edges {
        node {
          data {
            name
          }
        }
      }
    }
  }
`
