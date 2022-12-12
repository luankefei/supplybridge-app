import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "react-google-charts";
import { allCountry } from "utils/countries";
import useStore from "hooks/useStore";

const initialOptions: any = {
  resolution: "countries",
  legend: "none",
  enableRegionInteractivity: true,
  defaultColor: "#FF9C6E",
};

const dataHeader = ["Country", "Selection"];
export const GeoCharts = () => {
  const [options, setOptions] = useState<any>(initialOptions);
  const [backVisibility, setBackVisibility] = useState<boolean>(false);
  const {
    allCountries,
    setAllCountries,
    setSelectedRegions,
    setSelectedCountries,
    selectedCountries,
    setFilterData,
  } = useStore();

  const firstData = () => {
    let initialData: any = [];
    for (const key in allCountry) {
      allCountry[key].children.map((item) => {
        initialData.push([item.name, item.code]);
      });
    }
    setAllCountries([dataHeader, ...initialData]);
  };

  useEffect(() => {
    setTimeout(() => {
      firstData();
    }, 500);
  }, []);

  const goToWorld = () => {
    setBackVisibility(false);
    setOptions(initialOptions);
  };

  const clearFilter = () => {
    setTimeout(() => {
      firstData();
      setFilterData({ subRegions: [], regions: [] });
    }, 500);
  };

  const selectedCountry = (region: any) => {
    // Zoom tarafi
    for (const key in allCountry) {
      allCountry[key].children.map((item) => {
        if (item.name === region[0]) {
          setOptions({
            ...options,
            resolution: "countries",
            region: allCountry[key].code,
          });
          setBackVisibility(true);
        }
      });
    }
    // Boyama tarafi
    const allList = [...allCountries];
    const index = allCountries.findIndex((item: any) => item[0] === region[0]);
    allList.splice(index, 1);
    if (region[1] > 0) {
      setAllCountries([...allList, [region[0], 0]]);
    } else {
      setAllCountries([...allList, [region[0], 1]]);
    }
  };

  useEffect(() => {
    let selectedCountry: any[] = [];
    let selectedRegions: any[] = [];
    const selected = allCountries.filter((item: any) => item[1] > 0);
    console.log("selected", selected);
    selected.map((selected: any) => {
      selectedCountry.push(selected[0]);
      for (const key in allCountry) {
        allCountry[key].children.map((item) => {
          if (item.name === selected[0]) {
            const regionIndex = selectedRegions.findIndex(
              (item) => item === allCountry[key].category
            );
            if (regionIndex === -1) {
              selectedRegions.push(allCountry[key].category);
            }
          }
        });
      }
    });
    setSelectedCountries(selectedCountry);
    setSelectedRegions(selectedRegions);
  }, [allCountries]);

  return (
    <MapContainer>
      <ButtonContainer>
        {backVisibility && <GoWorld onClick={goToWorld}>Go Back</GoWorld>}
        {selectedCountries.length > 0 && (
          <GoWorld onClick={clearFilter}>Clear Filter</GoWorld>
        )}
      </ButtonContainer>
      {options && (
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = allCountries[selection[0].row + 1];
                selectedCountry(region);
              },
            },
          ]}
          chartType="GeoChart"
          width="99%"
          height="411px"
          data={allCountries}
          options={{
            ...options,
            colorAxis: {
              minValue: 0,
              maxValue: 1,
              colors: ["#FF9C6E", "#85A5FF"],
            },
          }}
        />
      )}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  padding-right: 10px;
  z-index: 2;
`;

const GoWorld = styled.div`
  margin-left: 15px;
  background-color: #006d75;
  color: white;
  margin-top: 15px;
  cursor: pointer;
  width: fit-content;
  padding: 12px 6px;
  border-radius: 4px;
`;
