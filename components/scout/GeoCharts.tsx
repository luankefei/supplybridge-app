import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Chart from "react-google-charts";
import {Skeleton } from "@mui/material";

import { allCountry } from "utils/countries";
import useStore from "hooks/useStore";
import { useSupplier } from "requests/useSupplier";
import BackDrop from "./BackDrop";
import Icon from "components/Icon";

const initialOptions: any = {
  resolution: "countries",
  legend: "none",
  enableRegionInteractivity: true,
  defaultColor: "#FF9C6E",
  backgroundColor: "#edf1f3",
  focusTarget: "category",
  tooltip: { isHtml: true },
};

const dataHeader = [
  "Country",
  "Selection",
  { role: "tooltip", type: "string", p: { html: true } },
];

const GeoCharts = () => {
  const [options, setOptions] = useState<any>(null);
  const [backVisibility, setBackVisibility] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const { searchSuppliers, loading } = useSupplier();
  const {
    allCountries,
    setAllCountries,
    setSelectedRegions,
    setSelectedCountries,
    selectedCountries,
    filterData,
    suppliers,
  } = useStore();



  const generateTooltipContent = (name: string, shortName: string) => {
    return `<div><b>${name} </b><p> Suppliers: ${getNumberOfSuppliers(
      shortName
    )}</p></div>`;
  };
  const setInitialData = () => {
    let initialData: any = [];
    for (const key in allCountry) {
      allCountry[key].children.map((item) => {
        initialData.push([
          item.name,
          0,
          generateTooltipContent(item.fullName, item.name),
        ]);
      });
    }
    setAllCountries([dataHeader, ...initialData]);

  };

  const searchHandler = () => {
    searchSuppliers(1, true);
  };

  useEffect(() => {
    setInitialData();
    setOptions(initialOptions);
  }, [suppliers]);

  const mapFilterHandler = (data: any) => {
    let selectedCountry: string[] = [];
    let selectedRegions: number[] = [];

    // Filter out active countries on map
    const activeCountries = data.filter((item: any) => item[1] > 0);

    activeCountries.map((selected: any) => {
      // push the country code
      selectedCountry.push(selected[0]);

      // Find country region
      for (const key in allCountry) {
        allCountry[key].children.map((item) => {
          // Find Selected country
          if (item.name === selected[0]) {
            const regionIndex = selectedRegions?.findIndex(
              (item) => item === allCountry[key].categoryId
            );
            // Check wheater region is in the active data
            if (regionIndex === -1) {
              selectedRegions.push(allCountry[key].categoryId);
            }
          }
        });
      }
    });

    setSelectedCountries(selectedCountry);
    setSelectedRegions(selectedRegions);
  };

  useEffect(() => {
    if (filterData.subRegions.length) {
      outsideFilterHandler();
    } else {
      setInitialData();
    }
  }, [filterData]);

  const clearZoom = () => {
    setBackVisibility(false);
    setOptions(initialOptions);
  };

  const clearFilter = () => {
    setTimeout(() => {
      setInitialData();
      setSelectedCountries([]);
      setSelectedRegions([]);
    }, 500);
  };

  const outsideFilterHandler = () => {
    const allList = [...allCountries];
    const subRegions = filterData.subRegions;

    allCountries.forEach((c: any, index: number) => {
      if (subRegions.includes(c[0])) {
        allList[index][1] = 1;
      } else {
        if (allList[index] && c[0] !== "Country") {
          allList[index][1] = 0;
        }
      }
    });
    setAllCountries(allList);

    //Filter based on the selected countries
    searchHandler();
  };

  const selectCountryHandler = (region: any) => {
    // Zooming
    for (const key in allCountry) {
      allCountry[key].children.map((item: any) => {
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

    // Colorizing
    const allList = [...allCountries];
    const index = allCountries.findIndex((item: any) => item[0] === region[0]);
    allList.splice(index, 1);
    const selectedValue = region[1] > 0 ? 0 : 1;
    setAllCountries([...allList, [region[0], selectedValue, region[2]]]);
    mapFilterHandler([...allList, [region[0], selectedValue, region[2]]]);
  };

  const onMapLoadHandler = () => {
    // setTimeout(() => {
    setMapLoaded(true);
    // }, 200)
  };

  //Get Number of suppliers for country
  const getNumberOfSuppliers = (countryCode: string) => {
    const nosuppliers = suppliers.filter(
      (s: any) => s.location?.code === countryCode
    ).length;
    return nosuppliers;
  };

  const renderMapComponent = useCallback(() => {
    return (
      <Container>
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = allCountries[selection[0].row + 1];
                selectCountryHandler(region);
              },
            },
          ]}
          onLoad={onMapLoadHandler}
          chartType="GeoChart"
          width="99%"
          height="411px"
          data={allCountries}
          options={{
            ...options,
            colorAxis: {
              minValue: 0,
              maxValue: 1,
              colors: ["#08979c", "#10712B"],
            },
          }}
        />
        {suppliers.length<=0 && <BackDrop isOpen={true} /> }
      </Container>
    );
  }, [allCountries, options, mapLoaded]);

  return (
    <MapContainer>
      <ButtonContainer>
        {backVisibility && <GoWorld onClick={clearZoom}>Go Back</GoWorld>}
        {selectedCountries.length > 0 && (
          <GoWorld onClick={clearFilter}>Reset Map</GoWorld>
        )}
      </ButtonContainer>
      {renderMapComponent()}
      {!mapLoaded ? (
        <Skeleton animation="wave" height={410} width="100%" />
      ) : null}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #edf1f3;
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

const Container = styled.div`
  .google-visualization-tooltip {
    width: 180px;
    padding: 0px !important;
    border: solid 1px #bdbdbd;
    border-radius: 2px;
    background-color: white;
    position: absolute;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.6);
    -webkit-box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.6);
    font-family: arial;
  }

  .google-visualization-tooltip:first-child span > div {
    margin-top: -22px !important;
    padding: 0px;
    color: black !important;
    font-size: 12px !important;
  }

  //make the default tooltip very small and hide it using the font color similar to background
  .google-visualization-tooltip:first-child span {
    padding: 0px !important;
    margin: 0px;
    color: white !important;
    font-size: 1px !important;
  }
`;

export default GeoCharts;
