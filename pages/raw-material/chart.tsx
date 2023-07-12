import { useEffect, useState } from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import LoadingAnimation from "components/LoadingAnimation";
import {
  Button,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { SpacingVertical } from "components/ui-components/spacer";
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
import { HeaderText, LargeText } from "components/ui-components/text";
import PoweredBy from "components/ui-components/poweredBy";
import {
  RoundedToggleButton,
  RoundedToggleButtonGroup,
} from "components/ui-components/roundedToggleGroup";
import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";

interface IChartProps {
  materialList: string[];
}

const ChartHeader = styled.div`
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
  Hour = "Hour",
  Day = "Day",
  Week = "Week",
  Month = "Month",
  Year = "Year",
}
const CommodityChart = ({ materialList }: IChartProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [frequency, setFrequency] = useState<RangeEnum>(RangeEnum.Day);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const [data, setData] = useState<any[]>([]);
  const handleRangeUpdate = (newRange: SegmentedValue) => {
    const nr = newRange as RangeEnum;
    setFrequency(nr);
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
      <ChartHeader>
        <LargeText>Raw Material Prices</LargeText>
        <Segmented
          size="large"
          defaultValue={frequency}
          options={[
            RangeEnum.Hour,
            RangeEnum.Day,
            RangeEnum.Week,
            RangeEnum.Month,
            RangeEnum.Year,
          ]}
          onChange={handleRangeUpdate}
        />
      </ChartHeader>
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
    <Layout pageTitle={"Charts"} paddingHorizontal={48}>
      <SpacingVertical space="100px" />
      <HeaderText>
        Material price checking system, more insights for your decision!
      </HeaderText>
      <PoweredBy />
      <SpacingVertical space="50px" />

      <Grid container>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          color="info"
          onClick={() => router.push("/raw-material")}
        >
          Back
        </Button>
      </Grid>
      <SpacingVertical space="20px" />
      <StyledCard>
        <CommodityChart materialList={materialList} />
      </StyledCard>
    </Layout>
  );
};

const StyledCard = styled("div")`
  background: white;
  border-radius: 16px;
`;

export default MyChart;
