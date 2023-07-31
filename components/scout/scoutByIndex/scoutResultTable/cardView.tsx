import {
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import RoundImage from "components/ui-components/roundImage";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import { BadgeType, SupBadge } from "components/ui-components/supBadge";
import { SText } from "components/ui-components/text";
import VerifiedSupplierChip from "components/ui-components/verifiedSupplierChip";
import { useState } from "react";
import {
  FirstColumn,
  GridContainer,
  SecondColumn,
} from "../detailPanel/tabPanes/uitlStyled";
import { usePersistentStore } from "hooks/useStore";
import { ITableData } from "./helper";

interface IScoutResultCardViewProps {
  sx?: SxProps<Theme>;
  rows: ITableData[];
  selectedRows: number[];
  onRowSelect: (selectedRows: number[]) => void;
  pushDrawer: (supplierId: number) => void;
}

export default function ScoutResultCardView({
  sx,
  rows,
  selectedRows,
  onRowSelect,
  pushDrawer,
}: IScoutResultCardViewProps) {
  const theme = useTheme();

  const handleRowSelection = (idx: number) => {
    const newRows = [...selectedRows];
    if (selectedRows.includes(idx)) {
      newRows.splice(selectedRows.indexOf(idx), 1);
    } else {
      newRows.push(idx);
    }
    onRowSelect(newRows);
  };

  return (
    <Stack>
      {rows.map((row, index) => {
        return (
          <Card
            key={index}
            sx={{
              ...sx,
              cursor: "pointer",
              padding: "48px 24px",
              position: "relative",
              marginBottom: "24px",
              border: `1px solid white`,
              [`&:hover`]: {
                border: `1px solid ${theme.palette.primary.main}`,
              },
            }}
            onClick={() => {
              handleRowSelection(row.id || index);
            }}
          >
            <Checkbox
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
              checked={selectedRows.includes(row.id || index)}
            />
            <Stack
              data-id="title-container"
              direction={"row"}
              alignItems={"center"}
              marginLeft={"48px"}
            >
              <RoundImage src={row.logo} size={52} />
              <SpacingHorizontal space="8px" />
              <SText fontSize="24px">{row.name}</SText>
              <SpacingHorizontal space="8px" />
              <VerifiedSupplierChip />
              <SpacingHorizontal space="8px" />
              <SupBadge badge={BadgeType.major} />
            </Stack>
            <SpacingVertical space="24px" />
            <Stack direction={"row"} marginLeft={"76px"}>
              <GridContainer
                aria-label="first-grid"
                alignItems="start"
                width="40%"
              >
                <FirstColumn> Commodity </FirstColumn>
                <SecondColumn> chasis </SecondColumn>

                <FirstColumn> Core competitence </FirstColumn>
                <SecondColumn> Pedal </SecondColumn>

                <FirstColumn> Customers served </FirstColumn>
                <SecondColumn> ??? </SecondColumn>

                <FirstColumn> Supplier type </FirstColumn>
                <SecondColumn> Tire 1 </SecondColumn>

                <FirstColumn> Headquarter </FirstColumn>
                <SecondColumn> {row.headquarter} </SecondColumn>
              </GridContainer>
              <SpacingHorizontal space="24px" />

              <GridContainer aria-label="second-grid" alignItems="start">
                <FirstColumn> Founded </FirstColumn>
                <SecondColumn> - </SecondColumn>

                <FirstColumn> Revenue </FirstColumn>
                <SecondColumn> $160M (2021) </SecondColumn>

                <FirstColumn> Capacity Available </FirstColumn>
                <SecondColumn> ??? </SecondColumn>

                <FirstColumn> Insights </FirstColumn>
                <SecondColumn>
                  <Button
                    variant="text"
                    sx={{ padding: 0, fontSize: "12px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      pushDrawer(row.id || index);
                    }}
                  >
                    See details
                  </Button>
                </SecondColumn>

                <FirstColumn> Global Footprints </FirstColumn>
                <SecondColumn>
                  <Box width={250}>{row.globalFootprint?.join(", ")}</Box>
                </SecondColumn>
              </GridContainer>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}
