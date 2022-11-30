import React, { useState } from "react";
import styled from "styled-components";

import { Icon, TextField } from "components";

export const SearchBar = () => {
  const [searchItem, setSearchItem] = useState("");

  const onSearch = () => {
    console.log("searchItem", searchItem);
  };

  return (
    <SearchField
      id="search-parts"
      variant="filled"
      data-testid="search-parts"
      label="Search parts"
      value={searchItem}
      onChange={(e: any) => setSearchItem(e.target.value)}
      endAdornment={
        <CircleButton onClick={onSearch}>
          <Icon src="search" width={20} height={20} m={"12px"} hover />
        </CircleButton>
      }
    />
  );
};

const SearchField = styled(TextField)`
  width: 50%;
  max-width: 700px;
  min-width: 250px;
  .MuiFilledInput-root {
    height: 54px;
    border: 1px transparent solid;
    overflow: hidden;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 32px;
    &:hover {
      background-color: white;
    }
    &:hover: {
      background-color: white;
    }
    &.Mui-focused {
      background-color: white;
      boxShadow: '0.25 0 0 0 2px';
      border-color: ${(props) => props.theme.colors.primary};
    },
  }
  label {
    margin-left: 32px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #8c8c8c;
    font-family: inherit !important;
  }
  input {
    margin-left: 32px;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 92%;
    max-width: 100%;
    min-width: 250px;
  }
`;

const CircleButton = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary}`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;
