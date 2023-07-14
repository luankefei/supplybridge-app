import { theme } from "config/theme";
import React from "react";
import SideBarMenu from "./SidebarMenu";
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
    <Box sx={{ display: "flex" }}>
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
          flexGrow: 1,
        }}
      >
        {appBar}
        <Box
          sx={{
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
