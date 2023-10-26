import { Card, Stack, styled } from "@mui/material";

/**
 * Not sure how to pass Stack if we were using styled-components
 */
const DetailPanelCard = ({ children }: { children: React.ReactNode }) => (
  <Card
    component={Stack}
    gap={1}
    p={2}
    elevation={0}
    sx={{
      backgroundColor: "#F9FAFB",
    }}
  >
    {children}
  </Card>
);
export default DetailPanelCard;
