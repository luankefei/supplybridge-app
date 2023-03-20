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

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
    suppliers,
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
  const decisionCheckStatus = (type: string, obj: any) => {
    const id = obj.hasOwnProperty("code") ? obj.code : obj.id;
    return filterData[type].includes(id) ? true : false;
  };

  const isCategoryChecked = (type: string) => {
    return filterData[type].length > 0 ? true : false;
  };
  const onChangeHandler = (event: any, type: string, obj: any) => {
    selectFilterData(event.target.value, type, obj, false);
  };
  const selectFilterData = (
    ischecked: boolean,
    type: string,
    obj: any,
    isAllSelect: boolean
  ) => {
    const id = obj.hasOwnProperty("code") ? obj.code : obj.id;
    const rawFilterData = filterData;
    const value = ischecked;

    if (!isAllSelect && !rawFilterData[type].includes(id) && value) {
      rawFilterData[type].push(id);
    } else if (isAllSelect && value) {
      rawFilterData[type].indexOf(id) === -1 && rawFilterData[type].push(id);
    } else {
      const index = rawFilterData[type].indexOf(id);
      if (index > -1) {
        rawFilterData[type].splice(index, 1);
      }
    }

    if (type === "commodities" && !value) {
      const commodityComponents = components?.filter(
        (c: any) => c.commodityId === id
      );
      const commodityComponentsIDs = commodityComponents?.map(
        (cc: any) => cc.id
      );
      rawFilterData.components = rawFilterData?.components?.filter(
        (com: any) => !commodityComponentsIDs?.includes(com)
      );
    }

    if (rawFilterData.commodities.length === 0) {
      rawFilterData.components = [];
      setIsAllSelected((oldState) => ({
        ...oldState,
        components: false,
      }));
    }
    if (rawFilterData.regions.length === 0) {
      rawFilterData.subRegions = [];
      setIsAllSelected((oldState) => ({
        ...oldState,
        subRegions: false,
      }));
    }
    console.log("raw filter data", rawFilterData)
    setFilterData(rawFilterData);
    getFilterListById(rawFilterData, type);
  };

  const selectAllHandler = (event: any, type: string) => {
    const value = event.target.checked;
    setIsAllSelected((oldState) => ({
      ...oldState,
      [type]: value,
    }));
    let obj = data.find((o) => o.key === type);
    obj?.items.forEach((category: any) => {
      selectFilterData(value, type, category, true);
    });
  };

  const [expanded, setExpanded] = useState<number | false>(false);

  type IallSelected = {
    [key: string]: boolean;
  };
  const [isAllSelected, setIsAllSelected] = useState<IallSelected>({
    commodities: false,
    components: false,
    coreCompetencies: false,
    regions: false,
    subRegions: false,
  });

  const checkSelectedAllStatus = (type: string) => {
    return isAllSelected[type];
  };
  const handleChange =
    (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
    };

  const [searchItem, setSearchItem] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchItem(e.target.value);
  };
  return suppliers?.length > 0 && Object.keys(suppliers[0]).length > 0 ? (
    <ClickAwayListener onClickAway={() => setExpanded(false)}>
      <Container>
        <FilterContainer>
          {data.map((item, index) => {
            const isselected: boolean = isCategoryChecked(item.key);
            const isAllSelected: boolean = checkSelectedAllStatus(item.key);
            if (item.items.length) {
              return (
                <CustomizeAccordion
                  key={index}
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                >
                  <CustomizeAccordionSummary
                    expandIcon={
                      isselected ? (
                        <Icon src="chevron-down" width={16} height={16} />
                      ) : (
                        <Icon src="down-arrow-black" width={16} height={16} />
                      )
                    }
                    aria-controls={item.key}
                    id={item.key}
                    $isselected={isselected}
                  >
                    {item.label}
                  </CustomizeAccordionSummary>
                  <CustomizeAccordionDetails>
                    <InputContainer>
                      <StyledInput
                        onChange={handleSearchChange}
                        name="search"
                        placeholder="Search"
                        value={searchItem}
                        type="text"
                      />
                      <Icon
                        src="search2"
                        width={16}
                        height={16}
                        m={"0px"}
                        hover
                      />
                    </InputContainer>
                    <FormControlLabel
                      className="checkbox-select-all"
                      control={
                        <Checkbox
                          checked={isAllSelected}
                          onChange={(event) =>
                            selectAllHandler(event, item.key)
                          }
                        />
                      }
                      label={
                        <CheckboxLabel>
                          <b>{isAllSelected ? "Deselect All" : "Select All"}</b>
                        </CheckboxLabel>
                      }
                    />
                    {item.items?.map((checkbox: any, index: number) => {
                      const ischecked: boolean = decisionCheckStatus(
                        item.key,
                        checkbox
                      );
                      return (
                        <FormControlLabel
                          className="dropdown-items"
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
                              checked={ischecked}
                              checkedIcon={
                                <Icon
                                  src="tick"
                                  width={14}
                                  height={10}
                                  hover={false}
                                />
                              }
                            />
                          }
                        />
                      );
                    })}
                  </CustomizeAccordionDetails>
                </CustomizeAccordion>
              );
            }
          })}
        </FilterContainer>
      </Container>
    </ClickAwayListener>
  ) : null;
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FilterContainer = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  /* width: 242px; */
  /* background: #fafafa; */
  border-radius: 2px;
  height: fit-content;
  width: 926px;
  justify-content: start;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const CustomizeAccordion = styled(Accordion)`
  margin: 0 !important;
  border-radius: 16px !important;
  width: 178px;
  height: 42px;
  position: inherit !important;

  .Mui-expanded {
    min-height: 48px !important;
    display: flex;
    align-items: center;
  }
  .MuiCollapse-wrapper {
    padding-top: 20px !important;
  }
`;

const CustomizeAccordionSummary = styled(AccordionSummary) <any>`
  width: 178px;
  height: 44px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: ${(props) =>
    `${props.$isselected ? props.theme.colors.secondary : "#1A1A1A"} !important`};
  background-color: #ffffff !important;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 16px !important;
`;

const CustomizeAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;

  max-height: 500px;
  overflow: auto;

  position: absolute;
  width: 278px !important;
  z-index: 1;
  background-color: #ffffff;

  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  width: 178px;

  .MuiFormControlLabel-root {
    justify-content: start;
  }
  .MuiFormControlLabel-root.dropdown-items{
    justify-content: space-between !important;
  }
  .MuiCheckbox-root {
    //margin-left: 15px;
    &:hover {
      background-color: #ffffff !important;
    }
  }
  .Mui-focused {
    background-color: #ffffff !important;
  }
  .Mui-checked {
    background-color: #ffffff !important;
    color: ${(props) => props.theme.colors.secondary};
    img {
      object-fit: none !important;
    }
  }

  .checkbox-select-all{
    .Mui-checked{
    color: ${(props) => `${props.theme.colors.secondary} !important`};  
  }
}
`;

const CheckboxLabel = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;

    display: flex;
    align-items: center;
    color: ${(props) =>
    props.ischecked ? props.theme.colors.secondary : "#1f1f1f"};
  }
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #8c8c8c;
    margin-left: 8px;
  }

  b {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 24px;
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  margin: 20px 14px;
  border-bottom: 1px solid #e5e7eb;
  margin-left: 14px;
  background: #ffffff;

  &:hover {
  }
  &:focus {
  }

  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    width: 100%;
    height: 35px;
  }
`;

const StyledInput = styled.input`
  border: none !important;
  width: 100px;
  height: 44px;
  background-color: #ffffff !important;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #1a1a1a;
  ::placeholder {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    color: #8c8c8c;
  }
  img {
    object-fit: none !important;
  }
  &:focus {
    outline: none !important;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
  }
`;
export default ScoutFilter;
