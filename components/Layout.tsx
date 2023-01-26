import React from "react";
import styled from "styled-components";
import SideBarMenu from "./SidebarMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
  flex-direction: row;
`;
const InnerContainer = styled.div`
  position: relative;
  left: 60px;
  width: calc(100% - 60px);
  background-color: #ecf0f1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
`;

export default Layout;
