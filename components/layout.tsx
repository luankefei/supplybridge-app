import { theme } from "config/theme";
import React, { useEffect, useState } from "react";
import SideBarMenu from "./sidebarMenu";
import Head from "next/head";
import { Box, Drawer, useTheme } from "@mui/material";
import { usePersistentStore } from "hooks/useStore";

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
  const muiTheme = useTheme();
  const { collapsed, setCollapsed } = usePersistentStore();
  useEffect(() => {
    if (screen.width < theme.dimension.mobileBreakpoint) {
      setCollapsed(true);
    }
  }, []);

  const leftMenuWidth = collapsed
    ? theme.dimension.leftMenuWidthCollapsed
    : theme.dimension.leftMenuWidth;
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Head>
        <title>{(pageTitle || "") + " | Supply Bridge"}</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer
        open={true}
        sx={{
          width: leftMenuWidth,
          flexShrink: 0,
          transition: muiTheme.transitions.create("width", {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.enteringScreen,
          }),
          "& .MuiDrawer-paper": {
            width: leftMenuWidth,
            boxSizing: "border-box",
            border: 0,
            transition: muiTheme.transitions.create("width", {
              easing: muiTheme.transitions.easing.sharp,
              duration: muiTheme.transitions.duration.enteringScreen,
            }),
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <SideBarMenu
          collapsed={collapsed}
          toggleCollapsed={() => setCollapsed(!collapsed)}
        />
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
