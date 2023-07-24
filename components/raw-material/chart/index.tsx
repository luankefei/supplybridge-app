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
import { request } from "config/axios";
import { RawMaterialName as TRawMaterialName, apiNamesMap } from "../constants";
import PurpleDot from "./dot";
import styled from "styled-components";
import {
  FrequencyEnum,
  calculateDayRange,
  getPriceConverter,
} from "./calculate";
import { MaterialUnits, Unit } from "../units";
import CustomTooltip from "./tooltip";

interface IChartDataPoint {
  name: string;
  x: string;
  y: number;
}

interface IChart {
  materialName: TRawMaterialName;
  onRemove: () => void;
}

const StyledLineChart = styled(LineChart)`
  text {
    font-family: "Ubuntu";
    fill: #445b66;
  }
  .xAsix .recharts-cartesian-axis-ticks {
    margin-top: 10px;
  }
`;

// https://www.figma.com/file/d8mRsss3DDeAHwiVLAuZ30/SupplyBridge---Raw-Material-Pricing?node-id=1%3A6596&mode=dev
// TODO: Use theme
const chartColors = {
  purple: "#855CF8",
  grey: "#F0F0F0",
};

const RMChart = ({ materialName, onRemove }: IChart) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [frequency, setFrequency] = useState<FrequencyEnum>(FrequencyEnum.Day);
  const [data, setData] = useState<IChartDataPoint[]>([]);
  const [unit, setUnit] = useState<Unit | undefined>(
    MaterialUnits[materialName]
  );

  const handleRangeUpdate = (newRange: SegmentedValue) => {
    const nr = newRange as FrequencyEnum;
    setFrequency(nr);
  };

  /**
   * Use this to prevent frontend crashing
   */
  const validateDataAndTransform = (toBeValidated: any): boolean => {
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
    let c = (a: number) => a;
    if (unit && unit.measuredIn === "ton") {
      const { unit, converter } = getPriceConverter(toBeValidated[0].price);
      setUnit(unit);
      c = converter;
    }
    toBeValidated.forEach((v: any) => {
      v.price = c(v.price);
      v.ts = new Date(v.ts);
    });
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { st, ed } = calculateDayRange(frequency);
      const apiName = apiNamesMap[materialName];
      const res = await request.get(
        `/data/materialpricing?name=${apiName}&st=${st}&ed=${ed}`
      );
      if (res.status !== 200 || !validateDataAndTransform(res.data)) {
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
    <Card sx={{ height: "500px", borderRadius: "16px" }}>
      <Grid container justifyContent="space-between" alignItems="center" p={2}>
        <Grid item display={"flex"} flexDirection={"column"}>
          <LargeText> {materialName} </LargeText>
          {unit && (
            <SText>
              Unit: {unit.currency} / {unit.measuredIn}
            </SText>
          )}
        </Grid>
        <Grid item>
          <Segmented
            size="large"
            defaultValue={frequency}
            options={[
              FrequencyEnum.Day,
              FrequencyEnum.Month,
              FrequencyEnum.Year,
            ]}
            onChange={handleRangeUpdate}
          />
          <IconButton onClick={onRemove}>
            <Close />
          </IconButton>
        </Grid>
      </Grid>
      <Stack p={1}>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <LoadingAnimation />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={400 - 80}>
            <StyledLineChart
              data={data}
              style={{
                color: chartColors.grey,
              }}
              margin={{
                right: 32,
                left: 32,
              }}
            >
              <Legend verticalAlign="bottom" height={36} />
              <CartesianGrid stroke={chartColors.grey} />
              <XAxis
                dataKey="ts"
                tickFormatter={(tick) => {
                  return `${tick.getMonth() + 1}/${tick.getDate()}`;
                }}
                padding={{ left: 20, right: 20 }}
                scale={"time"}
                axisLine={false}
              />
              <YAxis
                type="number"
                domain={[
                  (dataMin: number) => dataMin * 0.99,
                  (dataMax: number) => Math.floor(dataMax * 1.05),
                ]}
                /// commented out because scale = "linear" sets tickFormat = fixed 0
                // tickFormatter={(tick) => {
                //   return tick.toFixed(1);
                // }}
                axisLine={false}
                scale={"linear"}
              />
              <Line
                name={`${materialName} Price`}
                type="monotone"
                dataKey="price"
                stroke={chartColors.purple}
                dot={<PurpleDot />}
              />
              <Tooltip content={<CustomTooltip />} />
            </StyledLineChart>
          </ResponsiveContainer>
        )}
      </Stack>
    </Card>
  );
};

export default RMChart;
