import React, { useState } from "react";
import Layout from "components/Layout";
import {
  AppBar,
  Autocomplete,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import rawMaterials, { allRawMaterials } from "./constants";
import { FormatAlignCenter, Info, Replay } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  SpacingVertical,
  SpacingHorizontal,
} from "components/ui-components/spacer";
import PoweredBy from "components/ui-components/poweredBy";
import { HeaderText, TitleText } from "components/ui-components/text";
import { toast } from "react-toastify";
import Icon from "components/Icon";
import styled from "styled-components";

export default function RawMaterial() {
  const router = useRouter();
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
  const addAllSubfields = () => {
    const subfields = rawMaterials.find(
      (v) => v.category === openedCategory
    )?.subfields;
    if (!subfields) return;
    const toAdd = subfields.filter((v) => !selectedMaterials.includes(v.name));
    setSelectedMaterials([...selectedMaterials, ...toAdd.map((v) => v.name)]);
  };

  const reset = () => {
    setSelectedMaterials([]);
  };
  return (
    <Layout pageTitle={"Market Data"}>
      <SpacingVertical space="100px" />
      <HeaderText>
        Material price checking system, more insights for your decision!
      </HeaderText>
      <PoweredBy />
      <SpacingVertical space="50px" />
      <StyledCard>
        <TitleText>Select by adding tags</TitleText>
        <SpacingVertical space="48px" />
        <Autocomplete
          value={selectedMaterials}
          multiple={true}
          options={allRawMaterials.map((option) => option.name)}
          renderInput={(params) => <TextField {...params} />}
          onChange={(_, value) => {
            setSelectedMaterials(value);
          }}
        />
      </StyledCard>
      <SpacingVertical space="50px" />
      <StyledCard>
        <HeaderText>Filter by category</HeaderText>
        <SpacingVertical space="24px" />
        <Stack>
          <Grid container>
            {rawMaterials.map((rawMaterial, idx) => (
              <Grid key={idx} item>
                <Button
                  style={{
                    minWidth: "156px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    backgroundColor:
                      openedCategory === rawMaterial.category
                        ? "#E5F7F8"
                        : undefined,
                  }}
                  onClick={() =>
                    setOpenedCategory(
                      openedCategory === rawMaterial.category
                        ? undefined
                        : rawMaterial.category
                    )
                  }
                >
                  <Icon
                    hover
                    width={52}
                    height={52}
                    src={rawMaterial.icon}
                    color={
                      openedCategory === rawMaterial.category
                        ? "#08979C"
                        : "#445B66"
                    }
                  />
                  <SpacingVertical space="10px" />
                  {rawMaterial.category}
                </Button>
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
                  onClick={addAllSubfields}
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
