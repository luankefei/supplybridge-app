import React, { useEffect, useState } from "react";
import { Grid, Card, IconButton, Stack, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import { LargeText, SText } from "components/ui-components/text";
import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import LoadingAnimation from "components/LoadingAnimation";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "react-toastify";
import { SpacingHorizontal } from "components/ui-components/spacer";

enum RangeEnum {
  Day = "Day",
  Week = "Week",
  Month = "Month",
  Year = "Year",
}
interface IChartDataPoint {
  name: string;
  x: string;
  y: number;
}

interface IChart {
  materialName: string;
  onRemove: () => void;
}

const RMChart = ({ materialName, onRemove }: IChart) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [frequency, setFrequency] = useState<RangeEnum>(RangeEnum.Day);
  const [data, setData] = useState<IChartDataPoint[]>([]);

  const handleRangeUpdate = (newRange: SegmentedValue) => {
    const nr = newRange as RangeEnum;
    setFrequency(nr);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `/api/fakeData?commodity=${materialName}&frequency=${frequency}`
      );
      if (!res.ok) {
        toast.error("Error fetching data...");
        setIsLoading(false);
        return;
      }
      const resp = await res.json();
      console.log(resp);
      setData(resp.data);
      setIsLoading(false);
    };
    // avoid fetching data on first render
    if (frequency) {
      fetchData();
    }
  }, [frequency, materialName]);

  return (
    <Card sx={{ height: 400 }}>
      <Grid container justifyContent="end" alignItems="center">
        <Grid item>
          <IconButton onClick={onRemove}>
            <Close />
          </IconButton>
        </Grid>
      </Grid>
      <Stack p={1}>
        <Grid container justifyContent="space-between">
          <Grid item display={"flex"} alignItems={"baseline"}>
            <LargeText> {materialName} </LargeText>
            <SpacingHorizontal space="8px" />
            <SText> Unit: USD per Troy Ounce</SText>
          </Grid>
          <Grid item>
            <Segmented
              size="large"
              defaultValue={frequency}
              options={[RangeEnum.Day, RangeEnum.Month, RangeEnum.Year]}
              onChange={handleRangeUpdate}
            />
          </Grid>
        </Grid>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <LoadingAnimation />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <Legend verticalAlign="top" height={36} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, "dataMax"]} />
              <Line
                name={"Gold Price"}
                type="monotone"
                dataKey="gold"
                stroke="#82ca9d"
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Stack>
    </Card>
  );
};

export default RMChart;
