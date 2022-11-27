import React from 'react';
import styled from 'styled-components';

import {Header} from './Header';

export const Layout = ({children}: {children: React.ReactElement}) => {
  return (
    <Container>
      <Header />
      <InnerContainer>
        {children}
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div``
const InnerContainer = styled.div`
  padding: 32px 50px;
  background-color:#ecf0f1;
`