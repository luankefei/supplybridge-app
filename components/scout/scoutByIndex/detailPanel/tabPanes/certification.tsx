import { Divider, Grid, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import { TabPaneTextSecondary } from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";
import DetailPanelCard from "../detailPanelCard";
import {
  STextBody,
  STextBody16,
  STextCaption,
} from "components/ui-components/text";

const Certificaiton = ({ data }: { data: TSupplierModel }) => {
  return (
    <Stack>
      <DetailPanelCard>
        <STextCaption textAlign="left">ISO9001</STextCaption>
        <STextBody textAlign="left">
          Quality management systems - Requirements
        </STextBody>
      </DetailPanelCard>
    </Stack>
  );
};
export default Certificaiton;
