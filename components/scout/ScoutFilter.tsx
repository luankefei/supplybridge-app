import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Icon } from "components";
import useStore from "hooks/useStore";
import styled from "styled-components";
import { useFilter } from "requests/useFilter";

export const ScoutFilter = () => {
  const { commodities, parts, regions, subRegions, setFilterData, filterData } = useStore();
  const { getParts, getSubRegions } = useFilter();

  const data = [
    {
      label: "Commodities",
      key: "commodities",
      items: commodities,
    },
    {
      label: "Parts",
      key: "parts",
      items: parts,
    },
    {
      label: "Core Technologies",
      key: "coreTechnologies",
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

  const getFilterListById = (data: any, type: string) => {
    if (type === 'commodities') {
      getParts(data.commodities)
    } else if (type === 'regions') {
      getSubRegions(data.regions)
    }
  }

  const onChangeHandler = (event: any, type: string, id: any) => {
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
    setFilterData(rawFilterData);
    getFilterListById(rawFilterData, type)
  }

  return (
    <FilterContainer>
      {data.map((item, index) => {
        if (item.items.length) {
          return (
            <CustomizeAccordion key={index}>
              <CustomizeAccordionSummary
                expandIcon={<Icon src="chevron-down" width={40} height={40} />}
                aria-controls={item.key}
                id={item.key}
              >
                {item.label}
              </CustomizeAccordionSummary>
              <CustomizeAccordionDetails>
                {item.items?.map((checkbox: any, index: number) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox onChange={(event) => onChangeHandler(event, item.key, checkbox.id)} />}
                    label={
                      <CheckboxLabel>
                        <p>{checkbox.description}</p>
                      </CheckboxLabel>
                    }
                  />
                ))}
              </CustomizeAccordionDetails>
            </CustomizeAccordion>
          );
        }
      })}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  width: 16%;
  margin-right: 32px;
  min-width: 242px;
  background: #fafafa;
  border-radius: 2px;
  height: fit-content;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const CustomizeAccordion = styled(Accordion)`
  margin: 0 !important;
`;

const CustomizeAccordionSummary = styled(AccordionSummary)`
  background: #f5f5f5;
  color: #006d75;
`;

const CustomizeAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #1f1f1f;
  }
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #8c8c8c;
    margin-left: 8px;
  }
`;
