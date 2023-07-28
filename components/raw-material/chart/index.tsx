import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  IconButton,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
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
  calculateMonthlyAverages as calculateOvertimeAverages,
  getPriceConverter,
} from "./calculate";
import { MaterialUnits, Unit } from "../units";
import CustomTooltip from "./tooltip";

interface IChartDataPoint {
  time: Date | string;
  value: number;
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

  .recharts-cartesian-axis-tick-line {
    display: none;
  }
`;
/**
 * This border radius only works on static elements
 * when this segmentd is clicked, the border radius is gone during transition
 */
const StyledSegmented = styled(Segmented)`
  &&& {
    background-color: #e5e7eb;
    // border-radius: 32px;
    // padding: 4px;
  }
  &&& .ant-radio-wrapper {
    // border-radius: 32px;
  }

  &&& .ant-segmented-item {
    // border-radius: 32px;
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

  const transformData = (
    toBeTransformed: { price: number; ts: string }[]
  ): IChartDataPoint[] => {
    const materialUnit = MaterialUnits[materialName];
    let c = (p: number) => p;
    if (materialUnit && materialUnit.measuredIn === "ton") {
      const { unit, converter } = getPriceConverter(toBeTransformed[0].price);
      setUnit(unit);
      c = converter;
    }
    const transformed = toBeTransformed.map((v) => {
      return {
        time: new Date(v.ts),
        value: c(v.price),
      };
    });
    let finalResult: IChartDataPoint[] = [];
    if (frequency === FrequencyEnum.Day) {
      finalResult = transformed.map((v) => {
        return {
          // format time as MM/DD/YYYY
          time: `${
            v.time.getMonth() + 1
          }/${v.time.getDate()}/${v.time.getFullYear()}`,
          value: v.value,
        };
      });
    }
    if (frequency === FrequencyEnum.Month) {
      const monthly = calculateOvertimeAverages(
        transformed,
        FrequencyEnum.Month
      );
      finalResult = monthly.map((v) => {
        return {
          time: v.timeStr,
          value: v.averagePrice,
        };
      });
    }
    if (frequency === FrequencyEnum.Year) {
      const yearly = calculateOvertimeAverages(transformed, FrequencyEnum.Year);
      finalResult = yearly.map((v) => {
        return {
          time: v.timeStr,
          value: v.averagePrice,
        };
      });
    }
    return finalResult;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { st, ed } = calculateDayRange(frequency);
      const apiName = apiNamesMap[materialName];
      if (!apiName) {
        toast.error(`No data for ${materialName}`);
        setIsLoading(false);
        return;
      }
      try {
        const res = await request.get(
          `/data/materialpricing?name=${apiName}&st=${st}&ed=${ed}`
        );
        if (res.status !== 200 || !validateData(res.data)) {
          toast.error("Error fetching data...");
          setIsLoading(false);
          return;
        }
        const transformedData = transformData(res.data);
        setData(transformedData);
      } catch (err: any) {
        toast.error(
          `Error when fetching data for ${apiName} err=${err?.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };
    // avoid fetching data on first render
    if (frequency && materialName) {
      fetchData();
    }
  }, [frequency, materialName]);

  const renderLegend = (props: any) => {
    const payload: any[] = props.payload;
    if (!payload) return null;
    return (
      <Box justifyContent={"center"} display={"flex"}>
        {payload.map((entry, index) => (
          <Stack
            color={"#445B66"}
            key={`item-${index}`}
            direction={"row"}
            alignItems={"center"}
          >
            <Box
              width={8}
              height={8}
              bgcolor={chartColors.purple}
              borderRadius={1}
              marginRight={1}
            ></Box>
            <SText color="#445B66" fontSize="12px" fontWeight="400">
              {entry.value}
            </SText>
          </Stack>
        ))}
      </Box>
    );
  };
  return (
    <Card sx={{ height: "455px", borderRadius: "16px" }}>
      <Grid container justifyContent="space-between" p={"24px 24px 24px 48px"}>
        <Grid item display={"flex"} flexDirection={"column"}>
          <LargeText> {materialName} </LargeText>
          {unit && (
            <SText fontSize="12px" fontWeight="400">
              Unit: {unit.currency} / {unit.measuredIn}
            </SText>
          )}
        </Grid>
        <Grid item>
          <StyledSegmented
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
          <ResponsiveContainer width="100%" height={320}>
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
              <Legend
                verticalAlign="bottom"
                height={40}
                iconType="circle"
                content={renderLegend}
              />
              <CartesianGrid stroke={chartColors.grey} />
              <XAxis
                dataKey="time"
                padding={{ left: 20, right: 20 }}
                axisLine={false}
                tickFormatter={(tick) => {
                  if (frequency === FrequencyEnum.Day) {
                    return tick.slice(0, 4);
                  }
                  return tick;
                }}
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
                dataKey="value"
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
