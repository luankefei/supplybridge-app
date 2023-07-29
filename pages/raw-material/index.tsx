import React, { useState } from "react";
import Layout from "components/layout";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import rawMaterials, {
  allRawMaterials,
} from "components/raw-material/constants";
import { FormatAlignCenter, Info, Replay } from "@mui/icons-material";
import {
  SpacingVertical,
  SpacingHorizontal,
} from "components/ui-components/spacer";
import { HeaderText } from "components/ui-components/text";
import styled from "styled-components";
import RMTopMenuBar from "components/raw-material/appBar";
import VerticalIconButton from "components/ui-components/verticalIconButton";
import RMChart from "components/raw-material/chart";
import { RawMaterialDescriptions } from "components/raw-material/descriptions";
import MaterialTooltip from "components/raw-material/materialTooltip";
import { useTranslation } from "react-i18next";

/**
 * The Raw Material page
 * -- input search bar
 * -- categories
 * -- charts
 *
 */
export default function RawMaterial() {
  const { t } = useTranslation();
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [openedCategory, setOpenedCategory] = useState<string | undefined>();

  const toggleMatieral = (material: string) => {
    const idx = selectedMaterials.indexOf(material);
    if (idx > -1) {
      setSelectedMaterials([
        ...selectedMaterials.slice(0, idx),
        ...selectedMaterials.slice(idx + 1),
      ]);
      return;
    }
    setSelectedMaterials([...selectedMaterials, material]);
  };
  const addAllSubfields = (subfields?: { name: string }[]) => {
    if (!subfields) return;
    const toAdd = subfields.filter((v) => !selectedMaterials.includes(v.name));
    setSelectedMaterials([...selectedMaterials, ...toAdd.map((v) => v.name)]);
  };

  const reset = () => {
    setSelectedMaterials([]);
  };
  return (
    <Layout
      pageTitle={t("sidebar.marketData", "Market Data")}
      appBar={
        <RMTopMenuBar>
          <Autocomplete
            id="raw-material-autocomplete"
            value={selectedMaterials}
            multiple={true}
            options={allRawMaterials.map((option) => option.name)}
            renderInput={(params) => (
              <TextField {...params} label="Type to find raw-material" />
            )}
            onChange={(_, value) => {
              setSelectedMaterials(value);
            }}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              style={{ color: "#445B66" }}
              variant="text"
              onClick={reset}
              startIcon={<Replay />}
            >
              Reset All
            </Button>
          </div>
        </RMTopMenuBar>
      }
      paddingHorizontal={"48px"}
    >
      <SpacingVertical space="50px" />
      <StyledCard>
        <HeaderText>Filter by category</HeaderText>
        <SpacingVertical space="24px" />
        <Stack>
          <Grid container>
            {rawMaterials.map((rawMaterial, idx) => {
              const isOpen = openedCategory === rawMaterial.category;
              let iconName = rawMaterial.icon;
              if (isOpen) {
                iconName += "-selected";
              }
              return (
                <Grid key={idx} item>
                  <VerticalIconButton
                    title={rawMaterial.category}
                    backgroundColor={isOpen ? "#E5F7F8" : undefined}
                    icon={iconName}
                    onClick={() =>
                      setOpenedCategory(
                        isOpen ? undefined : rawMaterial.category
                      )
                    }
                    disabled={rawMaterial.subfields.length === 0}
                  />
                </Grid>
              );
            })}
          </Grid>
          <SpacingVertical space="24px" />
          <Collapse in={!!openedCategory}>
            <Stack
              style={{
                borderRadius: 16,
                backgroundColor: "#F3F4F6",
              }}
            >
              <SpacingVertical space="12px" />
              <Grid container>
                {rawMaterials
                  .find((v) => v.category === openedCategory)
                  ?.subfields.map((subfield, idx) => {
                    const selected = selectedMaterials.includes(subfield.name);
                    const upatedDescription =
                      RawMaterialDescriptions[subfield.name];
                    if (!upatedDescription) {
                      // debug usage
                      console.log("No description for", subfield.name);
                    }
                    let description =
                      upatedDescription.Description ||
                      subfield.description ||
                      "";

                    return (
                      <Grid key={idx} item>
                        <ToggleButton
                          value={subfield.name}
                          selected={selected}
                          // disabled={disabled}
                          style={{
                            margin: 8,
                            padding: "8px 16px",
                            borderRadius: 100,
                            minWidth: 110,
                            borderColor: selected ? "#08979C" : "#E5E7EB",
                            backgroundColor: selected ? "#E5E7EB" : "#FFFFFF",
                            color: selected ? "#08979C" : "#445B66",
                          }}
                          onClick={() => toggleMatieral(subfield.name)}
                        >
                          {subfield.name}
                          <SpacingHorizontal space="10px" />
                          <StyledTooltip
                            placement="top"
                            title={
                              <MaterialTooltip
                                content={description}
                                automotiveUsage={
                                  upatedDescription.AutomotiveUse
                                }
                              />
                            }
                            arrow
                          >
                            <Info style={{ width: 14, color: "#9CA3AF" }} />
                          </StyledTooltip>
                        </ToggleButton>
                      </Grid>
                    );
                  })}
              </Grid>
              <Divider style={{ margin: "12px" }} />
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  startIcon={<FormatAlignCenter />}
                  onClick={() =>
                    addAllSubfields(
                      rawMaterials.find((v) => v.category === openedCategory)
                        ?.subfields
                    )
                  }
                >
                  <SpacingHorizontal space="10px" />
                  Select All
                </Button>
              </Box>
              <SpacingVertical space="24px" />
            </Stack>
          </Collapse>
        </Stack>
      </StyledCard>
      <SpacingVertical space="50px" />
      <Grid container rowSpacing={2} columnSpacing={2}>
        {selectedMaterials.map((materialName) => (
          <Grid key={materialName} item xs={6}>
            <RMChart
              materialName={materialName}
              onRemove={() => {
                toggleMatieral(materialName);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <SpacingVertical space="50px" />
    </Layout>
  );
}

// https://material-ui.com/components/tooltips/#customized-tooltips
const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: 0,
    borderRadius: 16,
  },
}));

// increase the specificity of your styles by using the && trick, which duplicates the class name and therefore increases its specificity without resorting to !important.
const StyledCard = styled(Card)`
  && {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-radius: 16px;
    box-shadow: none;
  }
`;
