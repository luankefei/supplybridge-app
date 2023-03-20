import { theme } from "config/theme";
import React from "react";
import styled from "styled-components";
import SideBarMenu from "./SidebarMenu";
import withAuth from "utils/withAuth";
import useBoundStore from "hooks/useBoundStore";

const Layout = ({ children }: { children: React.ReactNode }) => {

  const feedbackStore = useBoundStore((store) => store.feedback);
  const { setShow } = feedbackStore;

  const handleClickContainer = () => {
    console.log("handled close");
    setShow(false);
  }

  return (
    <Container onClick={handleClickContainer}>
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
  left: 0px;
  width: calc(100% - ${theme.dimension.leftMenuWidth});
  background-color: #ecf0f1;
  display: flex;
  flex-direction: column;
  z-index: 0;
  overflow-x: hidden;
`;

export default withAuth(Layout);
