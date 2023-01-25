import React from "react";
import styled from "styled-components";
import SideBarMenu from "./SidebarMenu";

const Layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <Container>
      <SideBarMenu />
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  font-family: "Ubuntu", sans-serif !important;
  display: flex;
`;
const InnerContainer = styled.div`
  padding: 32px 50px;
  width: 100%;
  background-color: #ecf0f1;
  display: flex;
  justify-content: center;
`;

export default Layout;
