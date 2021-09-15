import React from 'react'
import { breakpoints } from '@xstyled/system'
import styled, { css } from '@xstyled/emotion'

import socials from '../data/socials.json'
import SocialIcon from '../components/icons/SocialIcon'

const FooterStyled = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: textAlt;
  margin-top: 100px;
  padding: 20px 0;
`

const SocialList = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;

  ${breakpoints({
    xs: css`
      margin: 0 5px;
    `,
    sm: css`
      margin: 0 10px;
    `
  })}
`

const Copyright = styled.p`
  margin: 0;
  font-size: 0.8em;
  text-align: center;
`

const Footer = () => {
  const today = new Date()
  const year = today.getFullYear()

  return (
    <FooterStyled>
      <SocialList>
        {socials.map((social, index) => {
          return (
            <SocialLink key={index} href={social.url} target='_blank'>
              <SocialIcon title={social.title} />
            </SocialLink>
          )
        })}
      </SocialList>

      <Copyright>
        © {year}{' '}
        <a href='https://github.com/azobu-projects/template'>Template</a> by{' '}
        <a href='https://github.com/azobu-projects'>Azobu Projects</a>
      </Copyright>
    </FooterStyled>
  )
}

export default Footer
