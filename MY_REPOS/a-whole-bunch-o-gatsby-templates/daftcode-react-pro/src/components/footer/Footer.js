// @flow
import React from 'react';
import styled from 'styled-components';
import Link from '../link/Link';
import Flex from '../flex/Flex';

const FooterContainer = styled(Flex)`
  background: ${({ theme }) => theme.components.footer.background};
  width: 100%;
  height: 3rem;
  padding-right: 2rem;
  > ${Link} {
    margin-left: 1rem;
  }
`;

class Footer extends React.Component<{}> {
  render() {
    return (
      <FooterContainer alignItems="center" justifyContent="flex-end">
        <Link href="https://wizardly-poitras-931354.netlify.com">Storybook</Link>
        <Link href="https://github.com/mkaczkowski/daftcode-react-pro">Github</Link>
      </FooterContainer>
    );
  }
}

export default Footer;
