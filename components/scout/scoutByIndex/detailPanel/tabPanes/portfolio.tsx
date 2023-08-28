import { Divider, Grid, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import { TabPaneTextSecondary } from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";
import DetailPanelCard from "../detailPanelCard";
import { STextCaption } from "components/ui-components/text";
import { useTranslation } from "react-i18next";

const Portfolio = ({ data }: { data: TSupplierModel }) => {
  const { t} = useTranslation();
  return (
    <Stack>
      <DetailPanelCard>
        <STextCaption textAlign="left">
          {t("detailPanel.keyPartners", "KEY PARTNERS")}
        </STextCaption>
        <Grid container>
          <Grid item xs={2}>
            WEBASTO
          </Grid>
        </Grid>
      </DetailPanelCard>
      <SpacingVertical space="24px" />
      <DetailPanelCard>
        <STextCaption textAlign="left">
        {t("detailPanel.productLine", "PRODUCT LINES")}
        </STextCaption>
        <Grid container>
          <Grid item xs={2}>
            WEBASTO
          </Grid>
        </Grid>
      </DetailPanelCard>
    </Stack>
  );
};
export default Portfolio;
