import { Divider, Grid, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import { TabPaneTextSecondary } from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";

const Certificaiton = ({ data }: { data: TSupplierModel }) => {
  return (
    <Stack>
      <TabPaneTextSecondary>Certifications</TabPaneTextSecondary>
    </Stack>
  );
};
export default Certificaiton;
