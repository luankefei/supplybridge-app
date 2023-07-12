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
} from "@mui/material";
import rawMaterials, { allRawMaterials } from "./constants";
import { Replay } from "@mui/icons-material";
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

export default function RawMaterial() {
  const maxSelection = 5;
  const router = useRouter();
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [openedCategory, setOpenedCategory] = useState<string | undefined>();

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
              if (value.length > maxSelection) {
                return;
              }
              setSelectedMaterials(value);
            }}
          />
        </StyledCard>
        <SpacingVertical space="50px" />
        <StyledCard>
          <HeaderText>Filter by category</HeaderText>
          <SpacingVertical space="20px" />
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
              backgroundColor: "#08979C",
              color: "#FFFFFF",
              minWidth: "200px",
            }}
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

const StyledCard = muiStyled(Card)(`
    width: 100%;
    height: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-radius: 16px;
    box-shadow: none;
`);
