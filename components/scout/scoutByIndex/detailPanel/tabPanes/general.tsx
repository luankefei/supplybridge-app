import { Box, Divider, Grid, Stack } from "@mui/material";
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
    locations.add(allSubRegions[id].name);
  });
  return (
    <Stack>
      <TabPaneTextSecondary>BASIC INFO</TabPaneTextSecondary>
      <Box width={"65%"}>
        <GridContainer>
          <FirstColumn>
            <MyFirstColumnComponent icon="building" text="Headquarters" />
          </FirstColumn>
          <SecondColumn>{allSubRegions[data.headquarterId].name}</SecondColumn>

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

          <FirstColumn>
            <MyFirstColumnComponent icon="map" text="Regions" />
          </FirstColumn>
          <SecondColumn>APAC</SecondColumn>

          <FirstColumn>
            <MyFirstColumnComponent icon="users" text="Employees" />
          </FirstColumn>
          <SecondColumn>10001</SecondColumn>

          <FirstColumn>
            <MyFirstColumnComponent icon="dollar" text="Revenue" />
          </FirstColumn>
          <SecondColumn>$6.24 Billion(2021)</SecondColumn>

          <FirstColumn>
            <MyFirstColumnComponent icon="layer" text="Website" />
          </FirstColumn>
          <SecondColumn>www.xyztech.com</SecondColumn>
        </GridContainer>
      </Box>
      <SpacingVertical space="24px" />
      <Divider />
      <SpacingVertical space="24px" />
      <TabPaneTextSecondary>HIGHLIGHTS</TabPaneTextSecondary>
      <Grid container>
        <ul>
          <li>X123 Battery - RANGE 1,500km </li>
          <li>2020 Most Innovative Battery Award </li>
          <li>22021 32.6% Global Market Share (96GWh)</li>
        </ul>
      </Grid>
    </Stack>
  );
};

export default General;
