import { theme } from "config/theme";
import React from "react";
import SideBarMenu from "./sidebarMenu";
import Head from "next/head";
import { Box, Drawer } from "@mui/material";

const Layout = ({
  pageTitle,
  children,
  row,
  appBar,
  paddingVertical,
  paddingHorizontal,
}: {
  pageTitle?: string;
  row?: boolean;
  children: React.ReactNode;
  appBar?: React.ReactNode;
  paddingVertical?: string | number;
  paddingHorizontal?: string | number;
}) => {
  const leftMenuWidth = theme.dimension.leftMenuWidth;
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Head>
        <title>{(pageTitle || "") + " | Supply Bridge"}</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer
        sx={{
          width: leftMenuWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: leftMenuWidth,
            boxSizing: "border-box",
            border: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <SideBarMenu />
      </Drawer>
      <Box
        component="main"
        sx={{
          flex: "1 0 auto",
          width: "0",
        }}
      >
        {appBar}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            flexDirection: row ? "row" : "column",
            backgroundColor: "#ecf0f1",
            paddingLeft: paddingHorizontal,
            paddingRight: paddingHorizontal,
            paddingTop: paddingVertical,
            paddingBottom: paddingVertical,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
