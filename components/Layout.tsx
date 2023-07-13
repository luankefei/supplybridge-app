import { theme } from "config/theme";
import React from "react";
import styled from "styled-components";
import SideBarMenu from "./SidebarMenu";
import Head from "next/head";

/**
 *
 * @param props:
 * pageTitle: string -- title of the webpage,
 * children: React.ReactNode;
 * row: boolean -- whether the children should be displayed in a row or column
 * paddingVertical: string -- padding on the top and bottom
 * paddingHorizontal: string -- padding on the left and right
 */
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
  paddingVertical?: string | number;
  paddingHorizontal?: string | number;
}) => {
  return (
    <Container>
      <Head>
        <title>{(pageTitle || "") + " | Supply Bridge"}</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBarMenu width={theme.dimension.leftMenuWidth} />
      <div
        style={{
          display: "flex",
          flexDirection: row ? "row" : "column",
          overflowX: "hidden",
          position: "relative",
          left: theme.dimension.leftMenuWidth,
          width: `calc(100% - ${theme.dimension.leftMenuWidth})`,
          backgroundColor: "#ecf0f1",
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal,
          paddingTop: paddingVertical,
          paddingBottom: paddingVertical,
        }}
      >
        {children}
      </div>
    </Container>
  );
};

const Container = styled.div`
  font-family: "Ubuntu", sans-serif !important;
  display: flex;
  flex-direction: row;
`;

export default Layout;
