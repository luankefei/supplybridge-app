import React, { useEffect, useState } from "react";
import { Grid, Card, IconButton, Stack, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import { LargeText, SText } from "components/ui-components/text";
import { Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import LoadingAnimation from "components/ui-components/loadingAnimation";
import {
  CartesianGrid,
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
import { request } from "config/axios";
import { apiNamesMap } from "./constants";

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

  const validateData = (toBeValidated: any): boolean => {
    if (typeof toBeValidated !== "object") {
      return false;
    }
    if (!Array.isArray(toBeValidated)) {
      return false;
    }
    if (toBeValidated.length === 0) {
      return true;
    }
    if (
      !(
        toBeValidated[0].hasOwnProperty("price") &&
        toBeValidated[0].hasOwnProperty("ts")
      )
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const today = new Date();
      const endTime = today.toISOString().split("T")[0];
      const startTime = "2022-01-01";
      const apiName = apiNamesMap[materialName];
      const res = await request.get(
        `/data/materialpricing?name=${apiName}&st=${startTime}&ed=${endTime}`
      );
      if (res.status !== 200 || !validateData(res.data)) {
        toast.error("Error fetching data...");
        setIsLoading(false);
        return;
      }
      setData(res.data);
      setIsLoading(false);
    };
    // avoid fetching data on first render
    if (frequency) {
      fetchData();
    }
  }, [frequency, materialName]);

  return (
    <Card sx={{ height: "30vh" }}>
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
          <ResponsiveContainer
            width="100%"
            height={window.innerHeight * 0.3 - 80}
          >
            <LineChart
              data={data}
              margin={{
                top: 16,
                right: 32,
                left: 16,
                bottom: 16,
              }}
            >
              <Legend verticalAlign="top" height={36} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="ts" />
              <YAxis
                type="number"
                domain={[0, (dataMax: number) => Math.floor(dataMax * 1.1)]}
              />
              <Line
                name={`${materialName} Price`}
                type="monotone"
                dataKey="price"
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
