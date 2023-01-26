import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useStore from "hooks/useStore";

import Icon from "components/Icon";
import TextField from "components/TextField";
import { InputAdornment } from "@mui/material";

interface Props {
  onSearch: () => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [searchItem, setSearchItem] = useState("");
  const { setFilterData } = useStore();

  const onClickSearch = () => {
    onSearch();
  };

  useEffect(() => {
    setFilterData({ q: searchItem });
  }, [searchItem]);

  const onKeyPressHandler = (event: any) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <SearchField
      id="search-parts"
      key="search-parts-input"
      variant="filled"
      data-testid="search-parts"
      label="Search Parts or Keywords (ie. Tire, NMC Battery, Recycling, and more...)"
      value={searchItem}
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


export const SearchBar2 = ({ onSearch }: Props) => {
  const [searchItem, setSearchItem] = useState("");
  const { setFilterData } = useStore();

  const onClickSearch = () => {
    onSearch();
  };

  useEffect(() => {
    setFilterData({ q: searchItem });
  }, [searchItem]);

  const onKeyPressHandler = (event: any) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <Container>
    <SearchField2
      id="search-parts"
      key="search-parts-input"
      variant="filled"
      data-testid="search-parts"
      label="Search Parts or Keywords (ie. Tire, NMC Battery, Recycling, and more...)"
      value={searchItem}
      onChange={(e: any) => setSearchItem(e.target.value)}
      onKeyPress={onKeyPressHandler}
      //   InputProps={{
      //   startAdornment: <InputAdornment position="start">
      //        <Icon src="search" width={13} height={13} m={"12px"} hover />
      //   </InputAdornment>,
      // }}
    />

    <SearchButton onClick={onClickSearch}>Search</SearchButton>
    </Container>
  );
};

const Container=styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 100%;
 
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    flex-direction: column;
  }
`
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

const SearchField2=styled(SearchField)`
height: 46px;
width: 80%;

label {
    margin-left: 32px;
    font-size: 14px !important;
    line-height: 22px !important;
    color: #8c8c8c;
    font-family: inherit !important;
    @media (max-width: ${(props) => props.theme.size.tablet}) {
   font-size: 11px;
   line-height: 18px;
  }
  }
  input {
    margin-left: 32px;
  }
  
`
const SearchButton=styled.button`
  width: 196px;
  height: 46px;
  border: none;
  border-radius: 32px;
  background: ${(props) => `${props.theme.colors.primary}`};
  color: #FFFFFF;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

export default SearchBar;
