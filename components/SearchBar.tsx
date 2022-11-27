import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";

import { Header } from "./Header";
import { Icon } from "./Icon";
import { TextField } from "./TextField";

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
  }
  label {
    margin-left: 32px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #8c8c8c;
  }
  input {
    margin-left: 32px;
  }
`;

const CircleButton = styled.div`
  background: #08979c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;
