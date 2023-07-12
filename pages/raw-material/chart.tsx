import { useEffect, useState } from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import LoadingAnimation from "components/LoadingAnimation";
import { Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Head from "next/head";
import { SpacingVertical } from "components/ui-components/spacer";
import NewHeader from "components/NewHeader";
import { ArrowBack } from "@mui/icons-material";
import styled from "styled-components";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "react-toastify";

interface IChartProps {
  materialList: string[];
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 24px;
    font-weight: 600;
    font-family: helvetica;
  }
`;
const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

enum RangeEnum {
  hour = "hour",
  day = "day",
  week = "week",
  month = "month",
  year = "year",
}
const CommodityChart = ({ materialList }: IChartProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [frequency, setFrequency] = useState<RangeEnum>(RangeEnum.day);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const [data, setData] = useState<any[]>([]);
  const handleRangeUpdate = (_: any, newRange: RangeEnum) => {
    setFrequency(newRange);
  };
  const handleSetSelectedMaterials = (_: any, newMaterials: string[]) => {
    setSelectedMaterials(newMaterials);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch(
      `/api/fakeData?commodity=${selectedMaterials.join(
        ","
      )}&frequency=${frequency}`
    );
    if (!res.ok) {
      toast.error("Error fetching data...");
      setIsLoading(false);
      return;
    }
    const data = await res.json();
    console.log(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setSelectedMaterials(materialList);
  }, [materialList]);

  useEffect(() => {
    fetchData();
  }, [frequency, selectedMaterials]);

  return (
    <Stack style={{ padding: 24 }}>
      <SpacingVertical space="20px" />
      <Header>
        <h3>Raw Material Prices</h3>
        <ToggleButtonGroup
          value={frequency}
          exclusive
          onChange={handleRangeUpdate}
        >
          <ToggleButton value={RangeEnum.hour}>Hour</ToggleButton>
          <ToggleButton value={RangeEnum.day}>Day</ToggleButton>
          <ToggleButton value={RangeEnum.week}>Week</ToggleButton>
          <ToggleButton value={RangeEnum.month}>Month</ToggleButton>
          <ToggleButton value={RangeEnum.year}>Year</ToggleButton>
        </ToggleButtonGroup>
      </Header>
      <SpacingVertical space="20px" />
      <div>
        <ToggleButtonGroup
          value={selectedMaterials}
          onChange={handleSetSelectedMaterials}
        >
          {materialList.map((m, idx) => (
            <ToggleButton key={idx} value={m}>
              {m}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <SpacingVertical space="20px" />
      <ChartContainer>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <ResponsiveContainer width="100%" height="80%">
            <LineChart width={760} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis dataKey="amt" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>
    </Stack>
  );
};

const MyChart = () => {
  const router = useRouter();
  const [materialList, setMaterialList] = useState<string[]>([]);
  const materials = router.query.materials as string;

  useEffect(() => {
    if (router.isReady) {
      if (
        materials !== undefined &&
        materials !== "" &&
        materials.split(",").length > 0
      ) {
        const m = materials.split(",");
        setMaterialList(m);
      } else {
        // no query string, go back to raw-material page
        router.replace("/raw-material");
      }
    }
  }, [materials, router]);

  return (
    <Layout>
      <Head>
        <title>Market Data | Supply Bridge</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack>
        <SpacingVertical space="150px" />
        <NewHeader title="Material price checking system, more insights for your decision!" />
        <div style={{ marginLeft: 48, marginRight: 48 }}>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            color="info"
            onClick={() => router.push("/raw-material")}
          >
            back
          </Button>
        </div>
        <SpacingVertical space="20px" />
        <StyledCard>
          <CommodityChart materialList={materialList} />
        </StyledCard>
      </Stack>
    </Layout>
  );
};

const StyledCard = styled("div")`
  margin-left: 48px;
  margin-right: 48px;
  background: white;
  border-radius: 16px;
`;

export default MyChart;
