import React, { useState } from "react";
import Layout from "components/Layout";
import {
  Autocomplete,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import rawMaterials, { QuickAddMaterials, allRawMaterials } from "./constants";
import { FormatAlignCenter, Info, Replay, Title } from "@mui/icons-material";
import {
  SpacingVertical,
  SpacingHorizontal,
} from "components/ui-components/spacer";
import PoweredBy from "components/ui-components/poweredBy";
import { HeaderText, SText, TitleText } from "components/ui-components/text";
import Icon from "components/Icon";
import styled from "styled-components";
import RMTopMenuBar from "components/raw-material/appBar";
import VerticalIconButton from "components/ui-components/verticalIconButton";

export default function RawMaterial() {
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
      pageTitle={"Market Data"}
      appBar={
        <RMTopMenuBar>
          <Grid style={{ padding: "0 48px" }} container>
            <Grid item xs={6}>
              <Stack style={{ padding: "0 48px" }}>
                <SpacingVertical space="36px" />
                <TitleText>
                  Material price checking system, more insights for your
                  decision!
                </TitleText>
                <PoweredBy />
                <SpacingVertical space="36px" />
                <Autocomplete
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
                <SpacingVertical space="36px" />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <SpacingVertical space="36px" />
              <TitleText>Quick Add</TitleText>
              <Grid container>
                {QuickAddMaterials.map((rawMaterial, idx) => (
                  <Grid key={idx} item>
                    <VerticalIconButton
                      title={rawMaterial.category}
                      icon={rawMaterial.icon}
                      onClick={() => addAllSubfields(rawMaterial.subfields)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
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
            {rawMaterials.map((rawMaterial, idx) => (
              <Grid key={idx} item>
                <VerticalIconButton
                  title={rawMaterial.category}
                  backgroundColor={
                    openedCategory === rawMaterial.category
                      ? "#E5F7F8"
                      : undefined
                  }
                  icon={rawMaterial.icon}
                  iconColor={
                    openedCategory === rawMaterial.category
                      ? "#08979C"
                      : "#445B66"
                  }
                  onClick={() =>
                    setOpenedCategory(
                      openedCategory === rawMaterial.category
                        ? undefined
                        : rawMaterial.category
                    )
                  }
                />
              </Grid>
            ))}
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

                    return (
                      <Grid key={idx} item>
                        <ToggleButton
                          value={subfield.name}
                          selected={selected}
                          style={{
                            margin: 8,
                            padding: "8px 16px",
                            borderRadius: 100,
                            minWidth: 110,
                            borderColor: selected ? "#08979C" : "#E5E7EB",
                            backgroundColor: selected ? "#E6F5F5" : "#FFFFFF",
                            color: selected ? "#08979C" : "#445B66",
                          }}
                          onClick={() => toggleMatieral(subfield.name)}
                        >
                          {subfield.name}
                          <SpacingHorizontal space="10px" />
                          <Tooltip title={"subfield.description"}>
                            <Info style={{ width: 14 }} />
                          </Tooltip>
                        </ToggleButton>
                      </Grid>
                    );
                  })}
              </Grid>
              <Divider style={{ margin: "12px" }} />
              <CenteredDiv>
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
              </CenteredDiv>
              <SpacingVertical space="24px" />
            </Stack>
          </Collapse>
        </Stack>
      </StyledCard>
      <SpacingVertical space="50px" />
      <div
        style={{
          display: "flex",
          paddingBottom: 3, // button has box-shaow 3px
          flexDirection: "row-reverse",
        }}
      >
        <Button
          style={{
            borderRadius: "100px",
            color: "#FFFFFF",
            minWidth: "200px",
          }}
          color="primary"
          variant="contained"
          disabled={selectedMaterials.length === 0}
        >
          Search
        </Button>
        <SpacingHorizontal space="10px" />
        <Button
          style={{ color: "#445B66" }}
          variant="text"
          onClick={reset}
          startIcon={<Replay />}
        >
          Reset All
        </Button>
      </div>
      <SpacingVertical space="700px" />
      <p>w</p>
    </Layout>
  );
}

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// increase the specificity of your styles by using the && trick, which duplicates the class name and therefore increases its specificity without resorting to !important.
const StyledCard = styled(Card)<{ height?: string }>`
  && {
    width: 100%;
    height: ${({ height }) => height || "auto"};
    padding: 24px;
    box-sizing: border-box;
    border-radius: 16px;
    box-shadow: none;
  }
`;
