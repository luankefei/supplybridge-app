import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Chart from "react-google-charts";
import { Skeleton } from "@mui/material";

import { allCountry } from "utils/countries";
import useStore from "hooks/useStore";
import { useSupplier } from "requests/useSupplier";
import Icon from "components/Icon";
import { useFilter } from "requests/useFilter";

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

const env: any = {};
const debounce = (fn: any, ms: number = 200) => {
   if (env.timer) clearTimeout(env.timer);
   env.timer = setTimeout(() => {env.timer = 0; fn();}, ms);
}

const GeoCharts = () => {
  const [options, setOptions] = useState<any>(null);
  const [backVisibility, setBackVisibility] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const allSubRegionsLoaded = useRef(false);
  const { searchSuppliers, loading } = useSupplier();
  const { getAllSubRegions } = useFilter();
  const {
    allCountries,
    setAllCountries,
    setSelectedRegions,
    setSelectedCountries,
    selectedCountries,
    filterData,
    suppliers,
    stats,
    setFilterData,
    allSubRegions,
  } = useStore();

  useEffect(() => {
    if (!allSubRegionsLoaded.current) {
      getAllSubRegions();
      allSubRegionsLoaded.current = true;
    }
  }, []);
  const generateTooltipContent = (name: string, noOfSuppliers: number) => {
    return noOfSuppliers >0? `<div><b>${name} </b><p> Suppliers: ${noOfSuppliers}</p></div>`
    : `<div><b>${name} </b></div>`
  };
  const setInitialData = () => {
    let initialData: any = [];
    for (const key in allCountry) {
      allCountry[key].children.map((item) => {
        const noOfSuppliers = getNumberOfSuppliers(item.name);
          // colorValue: null | 0 | 1
          // null => default color
          // 0 => #08979c
          // 1 =>  #10712B
          const colorValue=noOfSuppliers===0? null : 0
        initialData.push([
          item.name,
          colorValue,
          generateTooltipContent(item.fullName, noOfSuppliers),
        ]);
      });
    }
    setAllCountries([dataHeader, ...initialData]);
  };

  const setRegionsAndSubRegionsData = () => {
    let initialData: any = [];
    for (const key in allCountry) {
      allCountry[key].children.map((item) => {
        if(filterData?.subRegions?.includes(item.name))
        {
        const noOfSuppliers=getNumberOfSuppliersByRegion(item.name)
          // colorValue: null | 0 | 1
          // null => default color
          // 0 => #08979c
          // 1 =>  #10712B
          const colorValue=noOfSuppliers===0? null : 0
        initialData.push([
          item.name,
          colorValue,
          generateTooltipContent(item.fullName, noOfSuppliers),
        ]);
      }
      });
    
    }
    setAllCountries([dataHeader, ...initialData]);
  };

  const setRegionsSuppliersData = () => {
    let initialData: any = [];
    for (const key in allCountry) {
      allCountry[key].children.map((item) => {
        if(filterData?.regions?.includes(allCountry[key]?.categoryId))
        {
        const noOfSuppliers=getNumberOfSuppliersByRegion(item.name)
          // colorValue: null | 0 | 1
          // null => default color
          // 0 => #08979c
          // 1 =>  #10712B
          const colorValue=noOfSuppliers===0? null : 0
        initialData.push([
          item.name,
          colorValue,
          generateTooltipContent(item.fullName, noOfSuppliers),
        ]);
      }
      });
    
    }
    setAllCountries([dataHeader, ...initialData]);
  };

  const searchHandler = () => {
    searchSuppliers(1, true);
  };

  useEffect(() => {
    //if there is no query parameter initilize the map with all the suppliers data
    if(filterData?.subRegions?.length<1 && filterData?.regions?.length<1) {
    setInitialData();
    }
    else if(filterData?.subRegions?.length>=1 && filterData?.regions?.length >=1) {
    setRegionsAndSubRegionsData();
    }
    else if(filterData?.subRegions?.length<1 && filterData?.regions?.length >=1){
    setRegionsSuppliersData();
    }

    setOptions(initialOptions);
  }, [suppliers,allSubRegions]);

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
    debounce(outsideFilterHandler);
    if (filterData.subRegions.length) {
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
  const clearDropdownFilters = () => {
    setFilterData({
      commodities: [],
      components: [],
    });
  };

  const selectCountryHandler = (region: any) => {
    clearDropdownFilters();
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
    const region = allSubRegions.find((s: any) => s.code === countryCode);
    if (!region) return 0;
    if (!stats || !stats.locationId) return region.countSuppliersInLocation;
    return stats?.locationId?.[region.id] || 0;
  };

    //Get Number of suppliers for country
    const getNumberOfSuppliersByRegion = (countryCode: string) => {
      const region = allSubRegions.find((s: any) => s.code === countryCode);
      console.log("region",stats[region?.id])
      console.log("region",region?.id)
      if(region) console.log("stats",stats?.locationId?.[region?.id]);
      return region ? stats?.locationId?.[region?.id] : 0     
    };

  return (
    <MapContainer>
      <ButtonContainer>
        {false && backVisibility && <GoWorld onClick={clearZoom}>Go Back</GoWorld>}
        {selectedCountries.length === 1 ? (
          <GoWorld onClick={clearFilter}>Show All</GoWorld>
        ): null}
      </ButtonContainer>
      <Container>
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                if (!chart) return;
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
            defaultColor: '#f5f5f5',
          }}
        />
      </Container>
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
