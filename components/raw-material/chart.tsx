import React from "react";

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

const RMChart = ({ materialName }: { materialName: string }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 16,
      }}
    >
      {materialName}
    </div>
  );
};

export default RMChart;
