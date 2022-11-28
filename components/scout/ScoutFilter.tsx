import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Icon } from "components";
import React, { useState } from "react";
import styled from "styled-components";

export const ScoutFilter = () => {
  let dummyData = [
    {
      category: "Commodity",
      items: [
        {
          label: "Powertrain",
          number: "29,999",
        },
        {
          label: "Chassis",
          number: "49,999",
        },
        {
          label: "Interior",
          number: "9,999",
        },
        {
          label: "Exterior",
          number: "9,999",
        },
        {
          label: "Electronics",
          number: "29,999",
        },
        {
          label: "Digital",
          number: "9,999",
        },
        {
          label: "General Parts",
          number: "29,999",
        },
      ],
    },
    {
      category: "Parts",
      items: [
        {
          label: "Powertrain",
          number: "29,999",
        },
        {
          label: "Chassis",
          number: "49,999",
        },
        {
          label: "Interior",
          number: "9,999",
        },
        {
          label: "Exterior",
          number: "9,999",
        },
        {
          label: "Electronics",
          number: "29,999",
        },
        {
          label: "Digital",
          number: "9,999",
        },
        {
          label: "General Parts",
          number: "29,999",
        },
      ],
    },
    {
      category: "Region",
      items: [
        {
          label: "Americas",
          number: "29,999",
        },
        {
          label: "APAC",
          number: "49,999",
        },
        {
          label: "EMEA",
          number: "9,999",
        },
      ],
    },
  ];
  return (
    <FilterContainer>
      {dummyData.map((item, index) => (
        <CustomizeAccordion key={index}>
          <AccordionBerat
            expandIcon={<Icon src="chevron-down" width={40} height={40} />}
            aria-controls={item.category}
            id={item.category}
          >
            {item.category}
          </AccordionBerat>
          <CustomizeAccordionDetails>
            {item.items.map((checkbox, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={
                  <CheckboxLabel>
                    <p>{checkbox.label}</p>
                    <span> ({checkbox.number})</span>
                  </CheckboxLabel>
                }
              />
            ))}
          </CustomizeAccordionDetails>
        </CustomizeAccordion>
      ))}
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
`;

const CustomizeAccordion = styled(Accordion)`
  margin: 0 !important;
`;

const AccordionBerat = styled(AccordionSummary)`
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
