import { Divider, Grid, List, ListItem, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import { TabPaneTextSecondary } from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";

const SimilarCompanies = ({
  data,
  onClickSimilarCompany,
}: {
  data: TSupplierModel;
  onClickSimilarCompany: (sid: number) => void;
}) => {
  return (
    <Stack>
      <TabPaneTextSecondary>SIMILAR COMPANIES</TabPaneTextSecondary>
      <List>
        <ListItem>abcd</ListItem>
        <ListItem>company 2</ListItem>

        <ListItem>company 4</ListItem>
      </List>
    </Stack>
  );
};
export default SimilarCompanies;
