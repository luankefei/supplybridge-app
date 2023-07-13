import { useEffect, useState } from "react";
import { AppBar, Toolbar } from "@mui/material";

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
      style={{
        transition: "0.3s",
        transform: isScrolled ? "scale(0.9)" : "scale(1)",
      }}
    >
      <Toolbar style={{ backgroundColor: "white" }}>{children}</Toolbar>
    </AppBar>
  );
}

export default RMTopMenuBar;
