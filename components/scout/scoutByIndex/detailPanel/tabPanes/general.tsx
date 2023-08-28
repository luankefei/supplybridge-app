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

/**
 * 2 sections,
 * top section - basic info
 * with a list of information in a 2 column view
 * bottom section - highlights
 * a list of highlights with buillent points
 */
const General = ({ data }: { data: TSupplierModel }) => {
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
  const locations = new Set<string>();
  data.locationId.forEach((id) => {
    const foundName = allSubRegions[id]?.name;
    if (foundName) {
      locations.add(foundName);
    }
  });
  return (
    <Stack>
      <DetailPanelCard>
        <STextCaption textAlign="left">ABOUT</STextCaption>
        <STextBody16 textAlign="left">
          This company is a technology startup that focuses on developing
          cutting-edge software solutions for businesses and consumers alike.
        </STextBody16>
      </DetailPanelCard>

      <SpacingVertical space="16px" />
      <DetailPanelCard>
        <STextCaption textAlign="left">LOCATION</STextCaption>
        <GridContainer width="100%">
          <FirstColumn>
            <MyFirstColumnComponent icon="building" text="Headquarters" />
          </FirstColumn>
          <SecondColumn>
            {data.headquarterId === undefined
              ? "N/A"
              : allSubRegions[data.headquarterId]?.name}
          </SecondColumn>

          <FirstColumn>
            <MyFirstColumnComponent icon="location" text="Global Footprints" />
          </FirstColumn>
          <SecondColumn>
            <Box width={250}>
              {Array.from(locations).map((location, idx) => (
                <span key={idx}>{location}, </span>
              ))}
            </Box>
          </SecondColumn>
        </GridContainer>
      </DetailPanelCard>

      <SpacingVertical space="16px" />
      <DetailPanelCard>
        <STextCaption textAlign="left">BASIC INFO</STextCaption>
        <GridContainer width="100%">
          <FirstColumn>
            <MyFirstColumnComponent icon="calendar" text="Date of Foundation" />
          </FirstColumn>
          <SecondColumn>2010</SecondColumn>
          <FirstColumn>
            <MyFirstColumnComponent icon="users" text="Employees" />
          </FirstColumn>
          <SecondColumn>10001 (2021)</SecondColumn>
          <FirstColumn>
            <MyFirstColumnComponent icon="dollar" text="Revenue" />
          </FirstColumn>
          <SecondColumn>$6.24 Billion(2021)</SecondColumn>
          <FirstColumn>
            <MyFirstColumnComponent icon="internet" text="Website" />
          </FirstColumn>
          <SecondColumn>www.xyztech.com</SecondColumn>
          <FirstColumn>
            <MyFirstColumnComponent icon="layer" text="Type" />
          </FirstColumn>
          <SecondColumn>Tier 1</SecondColumn>
        </GridContainer>
      </DetailPanelCard>
      <SpacingVertical space="24px" />
      <DetailPanelCard>
        <STextCaption textAlign="left">HIGHLIGHTS</STextCaption>
        <Grid container>
          <ul>
            <li>X123 Battery - RANGE 1,500km </li>
            <li>2020 Most Innovative Battery Award </li>
            <li>22021 32.6% Global Market Share (96GWh)</li>
          </ul>
        </Grid>
      </DetailPanelCard>
    </Stack>
  );
};

export default General;
