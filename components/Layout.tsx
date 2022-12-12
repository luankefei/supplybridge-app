import React from "react";
import styled from "styled-components";

import { Header } from "./Header";

export const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Container>
      <Header />
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  font-family: "Ubuntu";
`;
const InnerContainer = styled.div`
  padding: 32px 50px;
  background-color: #ecf0f1;
  display: flex;
  justify-content: center;
`;
