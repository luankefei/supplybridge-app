import { theme } from "config/theme";
import React from "react";
import styled from "styled-components";
import SideBarMenu from "./SidebarMenu";
import withAuth from "utils/withAuth";
import Head from "next/head";

const Layout = ({
  pageTitle,
  children,
  row,
  paddingVertical,
  paddingHorizontal,
}: {
  pageTitle: string;
  row?: boolean;
  children: React.ReactNode;
  paddingVertical?: string;
  paddingHorizontal?: string;
}) => {
  return (
    <Container>
      <Head>
        <title>{pageTitle + " | Supply Bridge"}</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBarMenu />
      <InnerContainer>
        <div
          style={{
            display: "flex",
            flexDirection: row ? "row" : "column",
            paddingLeft: paddingHorizontal,
            paddingRight: paddingHorizontal,
            paddingTop: paddingVertical,
            paddingBottom: paddingVertical,
          }}
        >
          {children}
        </div>
      </InnerContainer>
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
  left: ${theme.dimension.leftMenuWidth};
  width: calc(100% - ${theme.dimension.leftMenuWidth});
  background-color: #ecf0f1;
`;

export default withAuth(Layout);
