import { Box, Button, Collapse, Stack } from "@mui/material";
import { useState } from "react";

interface IProps {
  collapsedWidth?: number;
  collapsible?: boolean;
  children: React.ReactNode;
}
export const SideBox = ({ collapsible = true, children }: IProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    console.log("toggleCollapsed");
    if (!collapsible) return;
    setCollapsed(!collapsed);
    // setWidth(collapsed ? expandWidth : collapsedWidth);
  };

  return (
    <Box position="fixed" top={0} right={0} component={Stack} direction={"row"}>
      <Box
        id="sidebox-always-visible"
        sx={{
          transform: "rotate(-90deg) translateX(0%)",
          transformOrigin: "bottom right",
        }}
      >
        <Button variant="contained" onClick={toggleCollapsed}>
          ToggleMapMMMMMAPPPA
        </Button>
      </Box>
      <Collapse in={collapsed} orientation="horizontal" collapsedSize={0}>
        {children}
      </Collapse>
    </Box>
  );
};
