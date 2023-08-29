import { Divider, Grid, List, ListItem, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import { TabPaneTextSecondary } from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";
import DetailPanelCard from "../detailPanelCard";
import { STextBody, STextCaption } from "components/ui-components/text";
import { useTranslation } from "react-i18next";
import RoundImage from "components/ui-components/roundImage";

const SimilarCompanies = ({
  data,
  onClickSimilarCompany,
}: {
  data: TSupplierModel;
  onClickSimilarCompany?: (sid: number) => void;
}) => {
  const { t } = useTranslation();
  return (
    <Stack>
      <DetailPanelCard>
        <STextCaption textAlign="left">
          {t("detailPanel.similarCompanies", "SIMILAR COMPANIES")}
        </STextCaption>
        <Grid container gap={1}>
          {data.similarCompanies?.length &&
            data.similarCompanies.map((company, idx) => (
              <Grid
                item
                xs={3}
                key={idx}
                component={Stack}
                direction={"row"}
                alignItems={"center"}
              >
                <RoundImage src={company.logo} size={24} />
                <STextBody>{company.name}</STextBody>
              </Grid>
            ))}
        </Grid>
      </DetailPanelCard>
    </Stack>
  );
};
export default SimilarCompanies;
