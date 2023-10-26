import { Box, Card, Divider, Grid, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import {
  FirstColumn,
  GridContainer,
  SecondColumn,
  TabPaneTextSecondary,
} from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";
import Icon from "components/icon";
import { usePersistentStore, useStore } from "hooks/useStore";
import {
  SText,
  STextBody16,
  STextCaption,
} from "components/ui-components/text";
import DetailPanelCard from "../detailPanelCard";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { toArray } from "utils/array";

/**
 * 2 sections,
 * top section - basic info
 * with a list of information in a 2 column view
 * bottom section - highlights
 * a list of highlights with buillent points
 */
const General = ({ data }: { data: TSupplierModel }) => {
  const { t } = useTranslation();
  const { allSubRegions } = usePersistentStore.getState();
  const MyFirstColumnComponent = ({
    icon,
    text,
  }: {
    icon: string;
    text: string;
  }) => (
    <Box alignItems={"center"} display={"flex"}>
      <Icon src={icon} width={16} m={"0 8px 0 0"} />
      {text}
    </Box>
  );

  const locations: Set<string> = useMemo(() => {
    const _locations: Set<string> = new Set<string>();

    const locationIds: number[] = toArray<number>(data.locationId);

    locationIds.forEach((id) => {
      const foundName = allSubRegions[id]?.name;
      if (foundName) {
        _locations.add(foundName);
      }
    });

    return _locations;
  }, [allSubRegions, data.locationId]);

  return (
    <Stack>
      <DetailPanelCard>
        <STextCaption textAlign="left">{t("detailPanel.about")}</STextCaption>
        <STextBody16 textAlign="left">
          {data.general?.description || "No description"}
        </STextBody16>
      </DetailPanelCard>

      <SpacingVertical space="16px" />
      <DetailPanelCard>
        <STextCaption textAlign="left">
          {t("detailPanel.location")}
        </STextCaption>
        <GridContainer width="100%">
          <FirstColumn>
            <MyFirstColumnComponent
              icon="building"
              text={t("detailPanel.headquarter", "Headquarter")}
            />
          </FirstColumn>
          <SecondColumn>
            {data.general?.headquarterName &&
              data.general?.headquarterName?.toString()}
            {!data.general?.headquarterName &&
              (data.headquarterId === undefined
                ? "N/A"
                : allSubRegions[data.headquarterId]?.name)}
          </SecondColumn>

          <FirstColumn>
            <MyFirstColumnComponent
              icon="location"
              text={t("detailPanel.globalFootprints", "Global Footprints")}
            />
          </FirstColumn>
          <SecondColumn>
            <Box width={250} textAlign={"right"}>
              {data.general?.globalFootprintNames &&
                data.general?.globalFootprintNames?.toString()}
              {Array.from(locations).map((location, idx) => (
                <span key={idx}>{location}, </span>
              ))}
            </Box>
          </SecondColumn>
        </GridContainer>
      </DetailPanelCard>

      <SpacingVertical space="16px" />
      <DetailPanelCard>
        <STextCaption textAlign="left">
          {t("detailPanel.basicInfo", "BASIC INFO")}
        </STextCaption>
        <GridContainer width="100%">
          <FirstColumn>
            <MyFirstColumnComponent
              icon="calendar"
              text={t("detailPanel.founded", "Date of Foundation")}
            />
          </FirstColumn>
          <SecondColumn>{data.general?.foundedYear}</SecondColumn>
          <FirstColumn>
            <MyFirstColumnComponent
              icon="users"
              text={t("detailPanel.employees", "Employees")}
            />
          </FirstColumn>
          <SecondColumn>{data.general?.employeeCount}</SecondColumn>
          <FirstColumn>
            <MyFirstColumnComponent
              icon="dollar"
              text={t("detailPanel.revenue", "Revenue")}
            />
          </FirstColumn>
          <SecondColumn>{data.general?.revenue}</SecondColumn>
          <FirstColumn>
            <MyFirstColumnComponent
              icon="internet"
              text={t("detailPanel.website", "Website")}
            />
          </FirstColumn>
          <SecondColumn>{data.general?.website}</SecondColumn>
          <FirstColumn>
            <MyFirstColumnComponent
              icon="layer"
              text={t("detailPanel.type", "type")}
            />
          </FirstColumn>
          <SecondColumn>Tier 1</SecondColumn>
        </GridContainer>
      </DetailPanelCard>
      <SpacingVertical space="24px" />
      {data.general?.highlights && data.general?.highlights.length > 0 && (
        <DetailPanelCard>
          <STextCaption textAlign="left">
            {t("detailPanel.highlights", "HIGHLIGHTS")}
          </STextCaption>
          <Grid container>
            <ul>
              {data.general.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </Grid>
        </DetailPanelCard>
      )}
    </Stack>
  );
};

export default General;
