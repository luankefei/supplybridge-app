import React from "react";
import styled from "styled-components";
import Chart from "react-google-charts";

export const GeoCharts = () => {
  const data = [
    ["Region Code", "Continent", "Popularity"],
    ["142", "Asia", 10000000],
    ["150", "Europe", 5000000],
    ["019", "Americas", 1],
    ["009", "Oceania", 10000000],
    ["002", "Africa", 5000000],
    ["143", "Russia", 1],
  ];
  return (
    <MapContainer>
      <Chart
        chartType="GeoChart"
        width="100%"
        height="411px"
        data={data}
        options={{
          resolution: "continents",
          colorAxis: { colors: ["#B37FEB", "#FF9C6E", "#85A5FF"] },
        }}
      />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
`;
