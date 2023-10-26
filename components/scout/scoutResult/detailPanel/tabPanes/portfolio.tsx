import { Divider, Grid, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import { TabPaneTextSecondary } from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";
import DetailPanelCard from "../detailPanelCard";
import { STextCaption } from "components/ui-components/text";
import { useTranslation } from "react-i18next";

const Portfolio = ({ data }: { data: TSupplierModel }) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <DetailPanelCard>
        <STextCaption textAlign="left">
          {t("detailPanel.keyPartners", "KEY PARTNERS")}
        </STextCaption>
        <Grid container gap={1}>
          {Array.isArray(data.portfolio?.keyPartners) &&
            data.portfolio?.keyPartners.map((keyPartner, idx) => (
              <Grid item xs={2} key={idx}>
                {keyPartner}
              </Grid>
            ))}
        </Grid>
      </DetailPanelCard>
      <SpacingVertical space="24px" />
      <DetailPanelCard>
        <STextCaption textAlign="left">
          {t("detailPanel.productLine", "PRODUCT LINES")}
        </STextCaption>
        <Grid container gap={1}>
          {Array.isArray(data.portfolio?.productLines) &&
            data.portfolio?.productLines.map((productLine, idx) => (
              <Grid
                item
                xs={2}
                key={idx}
                sx={{
                  wordWrap: "break-word",
                }}
              >
                {productLine}
              </Grid>
            ))}
        </Grid>
      </DetailPanelCard>
    </Stack>
  );
};
export default Portfolio;
