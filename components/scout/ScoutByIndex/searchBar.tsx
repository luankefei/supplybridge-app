import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Icon from "components/Icon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSupplier } from "requests/useSupplier";
import { debounce } from "utils/util";
import styled from "styled-components";
import { SpacingHorizontal } from "components/ui-components/spacer";

interface SearchBarProps {}

export enum SearchType {
  Keywords = "Keywords",
  Companies = "Companies",
}

const SearchBar = (props: SearchBarProps) => {
  const { t, i18n } = useTranslation();
  const { searchAutocomplete } = useSupplier();

  const [queryString, setQueryString] = useState("");
  const [searchType, setSearchType] = useState<SearchType>(SearchType.Keywords);
  const [options, setOptions] = useState([]);

  const handleSearchTypeChange = (event: any) => {
    setSearchType(event.target.value);
    setQueryString("");
  };
  const resetFilters = () => {
    setQueryString("");
    setSearchType(SearchType.Keywords);
  };
  const onInputChange = (event: any, value: string) => {
    if (event.type !== "change") {
      // click events dont trigger get autoComplete
      return;
    }
    setQueryString(value);
    debounce(() => handleSearch(value), 500);
  };

  const handleSearch = async (value: string) => {
    if (value === "" || value.length < 2) {
      setOptions([]);
      return;
    }
    console.log("getting autoComplete for", value);
    // TODO: enable this when API is ready
    // const suggestedItems = await searchAutocomplete(queryString);
    // setOptions(suggestedItems);
  };

  const onClickSearch = () => {
    console.log("searchType", searchType);
    console.log("queryString", queryString);
  };
  return (
    <Stack sx={{ width: "80%", margin: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="text" onClick={resetFilters}>
          <Icon src="reset" width={12} height={12} m="0px 6px" />
          {t("scout.searchbar.reset", "Reset")}
        </Button>
      </Box>

      <SearchBarContainer width={100}>
        <InputContainer>
          <SearchTypeSelect
            id="search_type"
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <MenuItem value={"Keywords"}>
              {t("scout.searchbar.keywords", "Keywords")}
            </MenuItem>
            <MenuItem value={"Companies"}>
              {t("scout.searchbar.companies", "Companies")}
            </MenuItem>
          </SearchTypeSelect>
          {queryString === "" ? (
            <Icon src="search2" width={20} height={20} m={"0px"} hover />
          ) : (
            <Icon src="search-color" width={20} height={20} m={"0px"} hover />
          )}
          <SpacingHorizontal space={"8px"} />
          <StyledAutocomplete
            freeSolo
            options={options}
            value={queryString}
            onInputChange={onInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={t(
                  `scout.searchbar.${searchType.toLowerCase()}Placeholder`,
                  "..."
                )}
              />
            )}
          />
        </InputContainer>

        <SearchButtonWrapper>
          <SearchButton onClick={onClickSearch}>
            {t("scout.searchbar.search", "Search")}
          </SearchButton>
        </SearchButtonWrapper>
      </SearchBarContainer>
    </Stack>
  );
};

const StyledAutocomplete = styled(Autocomplete)`
  flex-grow: 1;
  .MuiInputBase-root {
    border: none;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }
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

export default SearchBar;
