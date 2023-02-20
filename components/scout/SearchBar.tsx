import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useStore from "hooks/useStore";

import Icon from "components/Icon";
import TextField from "components/TextField";
import { Button } from "@mui/material";

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
  const { setFilterData, setSuppliers } = useStore();

  const onClickSearch = () => {
    clearFilters();
    onSearch();
  };

  useEffect(() => {
    //set new keyword and reset all other filters
    setFilterData({
      q: searchItem,
    });
  }, [searchItem]);

  const resetFilters = () => {
    setSearchItem("");
    clearFilters();
    setSuppliers([], true);

  };
  const clearFilters = () => {
    setFilterData({
      commodities: [],
      components: [],
      coreCompetencies: [],
      regions: [],
      subRegions: [],
      vehicleFuelTypes: [],
    });
  };
  const onKeyPressHandler = (event: any) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <Container>
      <SearchBarContainer>
        <InputContainer>
          {searchItem === "" ? (
            <Icon src="search2" width={20} height={20} m={"0px"} hover />
          ) : (
            <Icon src="search-color" width={20} height={20} m={"0px"} hover />
          )}

          <StyledInput
            onChange={(e: any) => setSearchItem(e.target.value)}
            name="search"
            placeholder="Search Parts or Keywords (ie. Tire, NMC Battery, Recycling, and more...)"
            onKeyPress={onKeyPressHandler}
            value={searchItem}
            type="text"
          />
        </InputContainer>
        <SearchButtonWrapper>
          <ResetAllButton variant="text" onClick={resetFilters}>
            <Icon src="reset" width={12} height={12} m="0px 10px" />
            Reset
          </ResetAllButton>
          <SearchButton onClick={onClickSearch}>Search</SearchButton>
        </SearchButtonWrapper>

      </SearchBarContainer>

      <ResetButtonContainer>

      </ResetButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 75%;
  margin-top: 22px;
  display: flex;
  justify-content: end;
  flex-direction: column;
`;
const SearchBarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 100%;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    flex-direction: column;
    gap: 30px;
  }
`;
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

const SearchButtonWrapper = styled.div`
  position: relative;
`;

const SearchButton = styled.button`
  width: 196px;
  height: 46px;
  border: none;
  border-radius: 32px;
  background: ${(props) => `${props.theme.colors.primary}`};
  cursor: pointer;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #f5f5f5;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
  &:hover {
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
      0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.08));
  }
  &:active {
    background: #006d75;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  width: 80%;

  padding-left: 16px;
  border-radius: 50px;

  background: #f9fafb;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 50px;

  &:hover {
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
      0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  &:focus {
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
      0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    width: 100%;
    height: 35px;
  }
`;

const StyledInput = styled.input`
  flex: 1 0;
  height: 46px;
  background-color: #f9fafb !important;
  padding-left: 13.34px;
  border: 0;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  border-radius: 50px;
  color: #1a1a1a;
  ::placeholder {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #b3b3b3;
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

const ResetButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const ResetAllButton = styled(Button)`
  position: absolute !important;
  top: -2.25rem;
  right: 23px;
  text-transform: capitalize;
  width: 56px;
  height: 24px;
  margin-top: 8px !important;
  margin-right: 5px !important;
  &:hover {
    cursor: pointer !important;
  }
`;
export default SearchBar;
