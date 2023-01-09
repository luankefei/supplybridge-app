import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Chart from "react-google-charts";
import { Skeleton } from "@mui/material";

import { allCountry } from "utils/countries";
import useStore from "hooks/useStore";

const initialOptions: any = {
  resolution: "countries",
  legend: "none",
  enableRegionInteractivity: true,
  defaultColor: "#FF9C6E",
};

const dataHeader = ["Country", "Selection"];

const GeoCharts = () => {
  const [options, setOptions] = useState<any>(null);
  const [backVisibility, setBackVisibility] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const {
    allCountries,
    setAllCountries,
    setSelectedRegions,
    setSelectedCountries,
    selectedCountries,
    filterData
  } = useStore();

  const setInitialData = () => {
    let initialData: any = [];
    for (const key in allCountry) {
      allCountry[key].children.map((item) => {
        initialData.push([item.name, 0]);
      });
    }
    setAllCountries([dataHeader, ...initialData]);
  };

  useEffect(() => {
    setInitialData();
    setOptions(initialOptions)
  }, []);

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
  }


  useEffect(() => {
    if (filterData.subRegions.length) {
      outsideFilterHandler();
    } else {
      setInitialData();
    }
    
  }, [filterData])

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
        if (allList[index] && c[0] !== 'Country') {
          allList[index][1] = 0; 
        }
        
      }
    })
    setAllCountries(allList);
  }

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
    setAllCountries([...allList, [region[0], selectedValue]]);
    mapFilterHandler([...allList, [region[0], selectedValue]])
  };


  const onMapLoadHandler = () => {
    // setTimeout(() => {
      setMapLoaded(true);
    // }, 200)
  }

  const renderMapComponent = useCallback(() => {
   return (
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
   )
  }, [allCountries, options, mapLoaded]);

  return (
    <MapContainer>
        <ButtonContainer>
          {backVisibility && <GoWorld onClick={clearZoom}>Go Back</GoWorld>}
          {selectedCountries.length > 0 && (
            <GoWorld onClick={clearFilter}>Clear Filter</GoWorld>
          )}
        </ButtonContainer>
        {renderMapComponent()}
        {!mapLoaded ? <Skeleton animation="wave" height={410} width="100%" /> : null}
    </MapContainer>
  )
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

export default GeoCharts;