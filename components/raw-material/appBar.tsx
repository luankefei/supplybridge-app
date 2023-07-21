import { useEffect, useState } from "react";
import { AppBar, Collapse, Grid, Stack, Toolbar } from "@mui/material";
import { SpacingVertical } from "components/ui-components/spacer";
import { TitleText } from "components/ui-components/text";
import PoweredBy from "components/ui-components/poweredBy";

/**
 * Raw Material's top menu bar -- sticky, and scales down on scroll
 */
function RMTopMenuBar({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const checkScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      color="transparent"
      style={
        {
          // transition: "0.3s",
          // transform: isScrolled ? "scale(0.9)" : "scale(1)",
        }
      }
    >
      <Toolbar style={{ backgroundColor: "white" }}>
        <Grid style={{ padding: "0 48px" }} container>
          <Stack style={{ padding: "0 48px" }}>
            <Collapse in={!isScrolled}>
              <SpacingVertical space="36px" />
              <TitleText>
                Material price checking system, more insights for your decision!
              </TitleText>
              <PoweredBy />
            </Collapse>

            <SpacingVertical space="36px" />
            {children}
            <SpacingVertical space="36px" />
          </Stack>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default RMTopMenuBar;
