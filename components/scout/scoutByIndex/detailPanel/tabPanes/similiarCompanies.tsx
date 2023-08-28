import { Divider, Grid, List, ListItem, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import { TabPaneTextSecondary } from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";
import DetailPanelCard from "../detailPanelCard";
import { STextCaption } from "components/ui-components/text";

const SimilarCompanies = ({
  data,
  onClickSimilarCompany,
}: {
  data: TSupplierModel;
  onClickSimilarCompany: (sid: number) => void;
}) => {
  return (
    <Stack>
      <DetailPanelCard>
        <STextCaption textAlign="left">Similar Companies</STextCaption>
      </DetailPanelCard>
    </Stack>
  );
};
export default SimilarCompanies;
