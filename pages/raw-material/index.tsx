import React, { useState } from "react";
import { styled as muiStyled } from "@mui/material/styles";
import Layout from "components/Layout";
import {
  Autocomplete,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import rawMaterials, { allRawMaterials } from "./constants";
import { Info, Replay } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  SpacingVertical,
  SpacingHorizontal,
} from "components/ui-components/spacer";
import Head from "next/head";
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

  const reset = () => {
    setSelectedMaterials([]);
  };
  const goToChart = () => {
    if (selectedMaterials.length === 0) {
      toast.error("Please select at least one material");
      return;
    }
    router.push({
      pathname: "/raw-material/chart",
      query: {
        materials: selectedMaterials.join(","),
      },
    });
  };
  return (
    <Layout>
      <Head>
        <title>Market Data | Supply Bridge</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack style={{ paddingLeft: 48, paddingRight: 48 }}>
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
            {openedCategory && (
              <Grid
                container
                columnSpacing={2}
                rowSpacing={2}
                style={{
                  padding: 12,
                  borderRadius: 16,
                  backgroundColor: "#F3F4F6",
                }}
              >
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
                            textTransform: "none",
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
            )}
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
            onClick={goToChart}
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
      </Stack>
    </Layout>
  );
}

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
