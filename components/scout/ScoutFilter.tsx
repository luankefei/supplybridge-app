import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "styled-components";

import useStore from "hooks/useStore";
import { useFilter } from "requests/useFilter";
import Icon from "components/Icon";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ClickAwayListener } from "@mui/material";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const ScoutFilter = () => {
  const {
    commodities,
    components,
    regions,
    subRegions,
    setFilterData,
    filterData,
    selectedRegions,
    selectedCountries,
  } = useStore();
  const { getComponents, getSubRegions } = useFilter();

  const data = [
    {
      label: "Commodities",
      key: "commodities",
      items: commodities,
    },
    {
      label: "Components",
      key: "components",
      items: components,
    },
    {
      label: "CoreCompetencies",
      key: "coreCompetencies",
      items: [],
    },
    {
      label: "Regions",
      key: "regions",
      items: regions,
    },

    {
      label: "Sub Regions",
      key: "subRegions",
      items: subRegions,
    },
  ];

  useEffect(() => {
    setFilterData({ regions: selectedRegions });
    getFilterListById({ regions: selectedRegions }, "regions");
  }, [selectedRegions]);

  useEffect(() => {
    setFilterData({ subRegions: selectedCountries });
  }, [selectedCountries]);

  const getFilterListById = (data: any, type: string) => {
    if (type === "commodities") {
      getComponents(data.commodities);
    } else if (type === "regions") {
      getSubRegions(data.regions);
    }
  };

  const onChangeHandler = (event: any, type: string, obj: any) => {
    const id = obj.hasOwnProperty("code") ? obj.code : obj.id;
    const rawFilterData = filterData;
    const value = event.target.checked;

    if (!rawFilterData[type].includes(id) && value) {
      rawFilterData[type].push(id);
    } else {
      const index = rawFilterData[type].indexOf(id);
      if (index > -1) {
        rawFilterData[type].splice(index, 1);
      }
    }

    if (type === 'commodities' && !value) {
      const commodityComponents = components?.filter((c: any) => c.commodityId === id);
      const commodityComponentsIDs = commodityComponents?.map((cc: any) => cc.id);
      rawFilterData.components = rawFilterData?.components?.filter((com: any) => !commodityComponentsIDs?.includes(com))
    } 

    if (rawFilterData.commodities.length === 0) {
      rawFilterData.components = [];
    }
    if (rawFilterData.regions.length === 0) {
      rawFilterData.subRegions = [];
    }
    setFilterData(rawFilterData);
    getFilterListById(rawFilterData, type); 
  };

  const decisionCheckStatus = (type: string, obj: any) => {
    const id = obj.hasOwnProperty("code") ? obj.code : obj.id;
    return filterData[type].includes(id) ? true : false;
  };

  const [expanded, setExpanded] = useState<number | false>(false);
  const handleChange =
  (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? index : false);
  };
  return (
    <ClickAwayListener onClickAway={()=>setExpanded(false)}>
    <FilterContainer>
      {data.map((item, index) => {
        if (item.items.length) {
          return (
            <CustomizeAccordion key={index} expanded={expanded === index} onChange={handleChange(index)}>
              <CustomizeAccordionSummary
                expandIcon={<Icon src="chevron-down" width={40} height={40} />}
                aria-controls={item.key}
                id={item.key}
              >
                {item.label}
              </CustomizeAccordionSummary>
              <CustomizeAccordionDetails>
                {item.items?.map((checkbox: any, index: number) => {

                  const ischecked:boolean= decisionCheckStatus(item.key, checkbox)
                  return (
                  <FormControlLabel
                  labelPlacement="start"
                    key={index}
                    label={
                      <CheckboxLabel ischecked={ischecked}>
                        <p>{checkbox.name}</p>
                      </CheckboxLabel>
                    }
                    control={
                      <Checkbox
                        onChange={(event) =>
                          onChangeHandler(event, item.key, checkbox)
                        }
                        icon={<Icon src="tick" width={0} height={0} />}
                        checked={decisionCheckStatus(item.key, checkbox)}
                        checkedIcon={<Icon src="tick" width={14} height={10} />}
                      />
                    }
                  
                  />
                )})}
              </CustomizeAccordionDetails>
            </CustomizeAccordion>
          );
        }
      })}
    </FilterContainer>
    </ClickAwayListener>
  );
};

const FilterContainer = styled.div`
margin-top: 24px;
display: flex;
gap: 20px;
  margin-bottom: 24px;
  /* width: 242px; */
  /* background: #fafafa; */
  border-radius: 2px;
  height: fit-content;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const CustomizeAccordion = styled(Accordion)`
  margin: 0 !important;
  border-radius: 16px !important;
  width: 178px;
height: 44px;
position: inherit !important;

.Mui-expanded{
min-height: 48px !important;
display: flex;
align-items: center;
}
.MuiCollapse-wrapper{
  padding-top: 20px !important;
}
`;

const CustomizeAccordionSummary = styled(AccordionSummary)`
  color: #006d75;
  width: 178px;
height: 44px;
background: #FFFFFF;
box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
border-radius: 16px !important;
`;

const CustomizeAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  max-height: 478px;
  overflow: auto;

  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: #FFFFFF;


  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
border-radius: 16px;
width: 178px;

.MuiFormControlLabel-root{
  justify-content: start;
}
.Mui-checked{
  color:${(props) => props.theme.colors.primary};
}
`;

const CheckboxLabel = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: ${(props) => props.ischecked? props.theme.colors.primary : '#1f1f1f'};
  }
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #8c8c8c;
    margin-left: 8px;
  }
`;

export default ScoutFilter;
