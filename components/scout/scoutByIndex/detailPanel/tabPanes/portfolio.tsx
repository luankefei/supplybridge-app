import { Divider, Grid, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import { TabPaneTextSecondary } from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";

const Portfolio = ({ data }: { data: TSupplierModel }) => {
  return (
    <Stack>
      <TabPaneTextSecondary>KEY PARTNETS</TabPaneTextSecondary>
      <Grid container>
        <Grid item xs={2}>
          WEBASTO
        </Grid>
      </Grid>
      <SpacingVertical space="24px" />
      <Divider />
      <SpacingVertical space="24px" />
      <TabPaneTextSecondary>Product lines</TabPaneTextSecondary>
      <Grid container>
        <Grid item xs={2}>
          ncm523
        </Grid>
      </Grid>
    </Stack>
  );
};
export default Portfolio;
