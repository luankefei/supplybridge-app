import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useStore from "hooks/useStore";

import Icon from "components/Icon";
import TextField from "components/TextField";

interface Props {
  onSearch: () => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [searchItem, setSearchItem] = useState("");
  const { setFilterData, filterData } = useStore();

  const onClickSearch = () => {
    onSearch();
  };

  useEffect(() => {
    setFilterData({ q: searchItem });
  }, [searchItem]);


  const onKeyPressHandler = (event: any) => {
    if(event.key === 'Enter') {
      onSearch();
    };
  }

  return (
    <SearchField
      id="search-parts"
      variant="filled"
      data-testid="search-parts"
      label="Search Parts or Keywords (ie. Tire, NMC Battery, Recycling, and more...)"
      value={filterData.q}
      onChange={(e: any) => setSearchItem(e.target.value)}
      onKeyPress={onKeyPressHandler}
      endAdornment={
        <CircleButton onClick={onClickSearch}>
          <Icon src="search" width={20} height={20} m={"12px"} hover />
        </CircleButton>
      }
    />
  );
};

const SearchField = styled(TextField)`
  width: 65%;
  // max-width: 700px;
  // min-width: 500px;
  .MuiFilledInput-root {
    height: 54px;
    border: 1px transparent solid !important;
    overflow: hidden !important;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 32px !important;
    &:hover {
      background-color: white;
    }
    &:hover {
      background-color: white;
    }
    &.Mui-focused {
      background-color: white;
      box-shadow: 0.25 0 0 0 2px;
      border-color: ${(props) => props.theme.colors.primary};
    }
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
    min-width: 200px;
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

export default SearchBar;
