import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import useStore from "hooks/useStore";
import useBoundStore from "hooks/useBoundStore";
import Icon from "components/Icon";
import TextField from "components/TextField";
import { Button, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";

import { L2L3tree } from "components/scout/summaryCategoryData";

interface Props {
  onSearch: () => void;
  width?: number;
  placeholder?: string;
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

// XXX: in future, we should use i18n component
//      now we just hardcoded map
const langWordMap: any = {
   EN: {
      Keywords: "Keywords",
      Companies: "Companies",
      Search: "Search",
      Placeholder: {
         Keywords: "Search Parts or Keywords (ie. Tire, NMC Battery, Recycling, and more...)",
         Companies: "Search for Companies",
      },
   },
   DE: {
      Keywords: "Schlüsselwörtern",
      Companies: "Lieferanten",
      Search: "Suchen",
      Placeholder: {
         Keywords: "Suchen Sie nach Komponenten oder Schlüsselwörtern (z.B. Reifen, NMC-Batterie, Recycling...)",
         Companies: "Suche nach Lieferanten",
      },
   },
};

export const SearchBar2 = ({ onSearch, width = 100 }: Props) => {
  const {
     suppliers,
     filterData,
     setSelectedCountries,
     setSelectedRegions,
     setFilterData, setSuppliers, setShowBackdrop, flags
  } = useStore();
  const [searchItem, setSearchItem] = useState("");
  const [searchItemDisplay, setSearchItemDisplay] = useState("");
  const [searchType, setSearchType] = useState(flags.type || "Keywords");
  const [searchLang, setSearchLang] = useState(flags.lang || "EN");

  useEffect(() => {
     // ensure first enter, no last search showing
     if (!suppliers.length && !searchItem) {
        flags.q = '';
        filterData.q = '';
     }
  }, [suppliers]);

  const handleSearchTypeChange = (evt: SelectChangeEvent) => {
     const val: string = evt.target.value as string;
     flags.type = val;
     setSearchType(val);
  }

  const handleSearchLangChange = (evt: SelectChangeEvent) => {
     const val: string = (evt.target as any).checked ? "DE" : "EN";
     flags.lang = val;
     setSearchLang(val);
  }

  const doTransform = () => {
    flags.q = searchItemDisplay;
    let transformed = searchItem;
/*
    const keys = Object.keys(L2L3tree);
    const possible = keys.map((L2: string) => L2L3tree[L2].de);
    const i = possible.indexOf(transformed.toLowerCase());
    if (i >= 0) {
       transformed = keys[i];
    }
*/
    return transformed;
  };

  const onClickSearch = () => {
    clearFilters();
    setFilterData({ q: doTransform() });
    onSearch();
  };

  const resetFilters = () => {
    setSearchItem("");
    setSearchItemDisplay("");
    flags.q = "";
    clearFilters();
    setSuppliers(null, true);
    setShowBackdrop(false);
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
    setSelectedCountries([]);
    setSelectedRegions([]);
  };
  const onKeyPressHandler = (event: any) => {
    if (event.key === "Enter") {
      clearFilters();
      setFilterData({ q: doTransform() });
      onSearch();
    }
  };

  const cbOnSearchChange = useCallback((evt: any) => {
     const value: string = evt.target.value;
     let transformed = value;
     if (value === 'achsenkomponenten') transformed = 'axle components';
     setSearchItem(transformed);
     setSearchItemDisplay(value);
  }, [setSearchItem, setSearchItemDisplay]);

  useEffect(() => {
     setSearchItemDisplay(flags.q);
  }, [filterData]);

  return (
    <Container>
      <ControlContainer>
        <SearchLangContainer label={searchLang}><Switch onChange={handleSearchLangChange} /></SearchLangContainer>
        <ControlSpace />
        <ResetAllButton variant="text" onClick={resetFilters}>
          <Icon src="reset" width={12} height={12} m="0px 6px" />
          Reset
        </ResetAllButton>
      </ControlContainer>
      <SearchBarContainer width={width}>
        <InputContainer>
          <SearchTypeSelect id="search_type" value={searchType} onChange={handleSearchTypeChange}>
             <MenuItem value={"Keywords"}>{langWordMap[searchLang]?.Keywords}</MenuItem>
             <MenuItem value={"Companies"}>{langWordMap[searchLang]?.Companies}</MenuItem>
          </SearchTypeSelect>
          {searchItem === "" ? (
            <Icon src="search2" width={20} height={20} m={"0px"} hover />
          ) : (
            <Icon src="search-color" width={20} height={20} m={"0px"} hover />
          )}

          <StyledInput
            onChange={cbOnSearchChange}
            name="search"
            placeholder={langWordMap[searchLang]?.Placeholder?.[searchType]}
            onKeyPress={onKeyPressHandler}
            value={searchItemDisplay}
            type="text"
          />
        </InputContainer>
        <SearchButtonWrapper>
          <SearchButton onClick={onClickSearch}>{langWordMap[searchLang]?.Search}</SearchButton>
        </SearchButtonWrapper>
      </SearchBarContainer>

      <ResetButtonContainer></ResetButtonContainer>
    </Container>
  );
};

export const SearchBarForFilter = ({
  onSearch,
  width = 60,
  placeholder = "Searching...",
}: Props) => {
  const [searchItem, setSearchItem] = useState("");

  const { setFilterData } = useStore();

  useEffect(() => {
    setFilterData({ q: searchItem });
  }, [searchItem]);

  const onClickSearch = () => {
    clearFilters();
    setFilterData({ q: searchItem });
    onSearch();
  };
  const clearFilters = () => {
    setFilterData({
      q: "",
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
    <MainContainer>
      <SearchBarContainer width={width}>
        <InputContainer>
          {searchItem === "" ? (
            <Icon src="search2" width={20} height={20} m={"0px"} hover />
          ) : (
            <Icon src="search-color" width={20} height={20} m={"0px"} hover />
          )}

          <StyledInput
            onChange={(e: any) => setSearchItem(e.target.value)}
            name="search"
            placeholder={placeholder}
            onKeyPress={onKeyPressHandler}
            value={searchItem}
            type="text"
          />
        </InputContainer>
        <SearchButtonWrapper>
          <SearchButton onClick={onClickSearch}>Search</SearchButton>
        </SearchButtonWrapper>
      </SearchBarContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1040px;
  width: 100%;
  padding: 0 30px;
  margin-top: 22px;
  display: flex;
  justify-content: end;
  flex-direction: column;
`;
const SearchBarContainer = styled.div<{
  width: number;
}>`
  display: flex;
  width: ${(props) => `${props.width}%`};
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
      border-color: ${(props) => props.theme.colors.secondary};
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
  background-color: ${(props) => `${props.theme.colors.secondary}`};
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
  min-width: 120px;
  height: 46px;
  border: none;
  border-radius: 32px;
  background: ${(props) => `${props.theme.colors.secondary}`};
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
  width: 100%;

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

const SearchTypeSelect = styled(Select)<any>`
  min-width: 100px;
  max-width: 160px;
  width: 160px;
  border: none;

  & .MuiSelect-select {
     padding: 4px 0 5px 0;
  }
  & .MuiOutlinedInput-notchedOutline {
     border: none;
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

const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const ControlSpace = styled.div`
  flex: 1 0 auto;
`;

const SearchLangContainer = styled.div<{label: string}>`
  & .MuiSwitch-root {
     padding: 0;
     margin-bottom: 3px;
     width: 100px;
     border-radius: 50px;
  }
  & .MuiSwitch-root > span.MuiSwitch-track { background-color: #ccc; }
  & .MuiSwitch-track:before {
     content: "EN";
     color: black;
     position: absolute;
     top: 10px;
     left: 15px;
  }
  & .MuiSwitch-track:after {
     content: "DE";
     color: black;
     position: absolute;
     top: 10px;
     right: 20px;
  }
  & .MuiButtonBase-root {
     padding: 4px;
  }
  & .MuiSwitch-thumb {
     width: 50px;
     height: 30px;
     border-radius: 50px;
  }
  & .MuiTouchRipple-root:before{
     content: ${(props) => `"${props.label || 'EN'}"`};
     position: absolute;
     color: black;
     top: 10px;
     left: 18px;
  }
  & .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked {
     color: white;
     margin-left: 20px;
  }
`;

const ResetButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const ResetAllButton = styled(Button)`
  font-family: "Inter", sans-serif !important;
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5remx;
  text-transform: capitalize !important;
  &:hover {
    cursor: pointer !important;
  }
`;
export default SearchBar;
