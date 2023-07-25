import { Divider, Grid, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import {
  FirstColumn,
  GridContainer,
  SecondColumn,
  TabPaneTextSecondary,
} from "./uitlStyled";
import { SpacingVertical } from "components/ui-components/spacer";

const Innovation = ({ data }: { data: TSupplierModel }) => {
  return (
    <Stack>
      <TabPaneTextSecondary>R&D</TabPaneTextSecondary>
      <GridContainer>
        <FirstColumn>R&D Personnel</FirstColumn>
        <SecondColumn>8000</SecondColumn>

        <FirstColumn>R&D Personnel % (of total)</FirstColumn>
        <SecondColumn>20%</SecondColumn>

        <FirstColumn>R&D Investment in 2021(mil, USD)</FirstColumn>
        <SecondColumn>$500</SecondColumn>

        <FirstColumn>R&D Investment % (of revenue)</FirstColumn>
        <SecondColumn>9%</SecondColumn>

        <FirstColumn>Built-to-spec</FirstColumn>
        <SecondColumn>Yes</SecondColumn>

        <FirstColumn>Built-to-print</FirstColumn>
        <SecondColumn>Yes</SecondColumn>
      </GridContainer>
      <SpacingVertical space="24px" />
      <Divider />
      <SpacingVertical space="24px" />
      <TabPaneTextSecondary>PATENTS</TabPaneTextSecondary>
      <GridContainer>
        <FirstColumn>Total Patents(Global) </FirstColumn>
        <SecondColumn>46</SecondColumn>
      </GridContainer>
      <SpacingVertical space="24px" />
      <span>patentsCardHere</span>
    </Stack>
  );
};
export default Innovation;
