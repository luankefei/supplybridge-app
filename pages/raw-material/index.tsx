import React, { useEffect, useState } from "react";
import { styled as muiStyled } from "@mui/material/styles";
import styled from "styled-components";
import Layout from "components/Layout";
import NewHeader from "components/NewHeader";
import {
  Autocomplete,
  Button,
  Card,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import rawMaterials, { allRawMaterials } from "./constants";
import { ReplayCircleFilledOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  SpacingVertical,
  SpacingHorizontal,
} from "components/ui-components/spacer";
import Head from "next/head";

export default function RawMaterial() {
  const maxSelection = 5;
  const router = useRouter();
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const reset = () => {
    setSelectedMaterials([]);
  };
  const goToChart = () => {
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
      <Stack>
        <SpacingVertical space="150px" />
        <NewHeader
          title="Material price checking system, more insights for your decision!"
          subtitle="Powered by SmartBridge AI"
          subtitleIcon="smart-bridge-ai"
        />
        <SpacingVertical space="50px" />
        <StyledCard>
          <p>Select by adding tags</p>
          <span>Select maximum 5 materials</span>
          <br />
          <Autocomplete
            value={selectedMaterials}
            multiple={true}
            options={allRawMaterials.map((option) => option.name)}
            renderInput={(params) => <TextField {...params} />}
            onChange={(event, value) => {
              if (value.length > maxSelection) {
                return;
              }
              setSelectedMaterials(value);
            }}
          />
        </StyledCard>
        <SpacingVertical space="50px" />
        <StyledCard>
          <span>Filter by category</span>
          <SpacingVertical space="20px" />
          <Grid container spacing={2}>
            {rawMaterials.map((rawMaterial, idx) => (
              <Grid key={idx} item>
                <Card
                  onClick={() => {
                    console.log("click");
                  }}
                  style={{
                    minHeight: "100px",
                    minWidth: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {rawMaterial.category}
                </Card>
              </Grid>
            ))}
          </Grid>
        </StyledCard>
        <SpacingVertical space="50px" />
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button
            variant="contained"
            disabled={selectedMaterials.length === 0}
            onClick={goToChart}
          >
            Search
          </Button>
          <SpacingHorizontal space="10px" />
          <Button
            variant="outlined"
            onClick={reset}
            startIcon={<ReplayCircleFilledOutlined />}
          >
            Reset
          </Button>
        </div>
      </Stack>
    </Layout>
  );
}

const StyledCard = muiStyled(Card)(`
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
`);
