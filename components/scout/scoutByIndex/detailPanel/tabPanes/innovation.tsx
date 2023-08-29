import { Divider, Grid, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import {
  FirstColumn,
  GridContainer,
  SecondColumn,
  TabPaneTextSecondary,
} from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";
import DetailPanelCard from "../detailPanelCard";
import { STextBody, STextCaption } from "components/ui-components/text";
import { useTranslation } from "react-i18next";

const Innovation = ({ data }: { data: TSupplierModel }) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <DetailPanelCard>
        <STextCaption textAlign="left">
          {t("detailPanel.rd", "R&D")}
        </STextCaption>
        <GridContainer>
          <FirstColumn>
            {t("detailPanel.rdPersonnel", "R&D Personnel")}
          </FirstColumn>
          <SecondColumn>{data.innovation?.rndPersonnel}</SecondColumn>

          <FirstColumn>
            {t(
              "detailPanel.rdPersonnelPercentage",
              "R&D Personnel Percentage % (of total)"
            )}
          </FirstColumn>
          <SecondColumn>{data.innovation?.rndPersonnelPercentage}</SecondColumn>

          <FirstColumn>
            {t("detailPanel.rdInvestment", "R&D Investment")}
          </FirstColumn>
          <SecondColumn>{data.innovation?.rndInvestment}</SecondColumn>

          <FirstColumn>
            {t(
              "detailPanel.rdInvestmentPercentage",
              "R&D Investment Percentage % (of total)"
            )}
          </FirstColumn>
          <SecondColumn>
            {data.innovation?.rndInvestmentPercentage}
          </SecondColumn>

          <FirstColumn>
            {t("detailPanel.builtTospec", "Built-to-Spec")}
          </FirstColumn>
          <SecondColumn>{"Yes"}</SecondColumn>

          <FirstColumn>
            {t("detailPanel.builtToprint", "Built-to-Print")}
          </FirstColumn>
          <SecondColumn>{"Yes"}</SecondColumn>
        </GridContainer>
      </DetailPanelCard>
      <SpacingVertical space="24px" />
      <DetailPanelCard>
        <STextCaption textAlign="left">
          {t("detailPanel.patents", "Patents")}
        </STextCaption>
        <GridContainer>
          <FirstColumn>
            {t("detailPanel.totalPatents", "Total Patents(Global)")}
          </FirstColumn>
          <SecondColumn>
            {data.innovation?.patentsCount || data.innovation?.patents.length}
          </SecondColumn>
        </GridContainer>
        <Divider />
        <Grid container>
          <Grid item xs={2}>
            {data.innovation?.patents.map((patent, idx) => (
              <STextBody key={idx}>
                {idx + 1}. {patent.title}
              </STextBody>
            ))}
          </Grid>
        </Grid>
      </DetailPanelCard>
    </Stack>
  );
};
export default Innovation;
