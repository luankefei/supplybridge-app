import { theme } from "config/theme";
import React from "react";
import SideBarMenu from "./SidebarMenu";
import Head from "next/head";
import { AppBar, Box, Drawer, Grid } from "@mui/material";

const Layout = ({
  pageTitle,
  children,
  row,
  appBarContent,
  paddingVertical,
  paddingHorizontal,
}: {
  pageTitle?: string;
  row?: boolean;
  children: React.ReactNode;
  appBarContent?: React.ReactNode;
  paddingVertical?: string | number;
  paddingHorizontal?: string | number;
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Head>
        <title>{(pageTitle || "") + " | Supply Bridge"}</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer
        sx={{
          width: theme.dimension.leftMenuWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: theme.dimension.leftMenuWidth,
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
        {appBarContent && (
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - 312px)`, ml: `321px` }}
          >
            {appBarContent}
          </AppBar>
        )}
        <Box
          sx={{
            flexDirection: row ? "row" : "column",
            backgroundColor: "#ecf0f1",
            padding: `${paddingVertical || 0} ${paddingHorizontal || 0}`,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
