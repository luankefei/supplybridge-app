import {
  Autocomplete,
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Icon from "components/icon";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSupplier } from "requests/useSupplier";
import styled from "styled-components";
import { SpacingHorizontal } from "components/ui-components/spacer";
import { ResetIconTextButton } from "components/ui-components/iconTextButton";

interface SearchBarProps {
  queryString?: string;
  onSearch: (queryString: string, searchType: EnumSearchType) => void;
  onReset: () => void;
}

export enum EnumSearchType {
  Keywords = "Keywords",
  Companies = "Companies",
}

/**
 * The search bar component for the scout page.
 * -- this component controls its own SearchType and queryString state
 * -- all results are passed back to the parent component by calling the onSearch callback
 */
const SearchBar = (props: SearchBarProps) => {
  const { t } = useTranslation();
  const { searchAutocomplete } = useSupplier();

  const [queryString, setQueryString] = useState("");
  useEffect(() => {
    setQueryString(props.queryString || "");
  }, [props.queryString]);

  const [searchType, setSearchType] = useState<EnumSearchType>(
    EnumSearchType.Keywords
  );
  const [open, setOpen] = useState(false);
  // autocomplete options
  const [options, setOptions] = useState<string[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(false);

  const handleSearchTypeChange = (event: any) => {
    setSearchType(event.target.value);
    setQueryString("");
  };
  const resetFilters = () => {
    setQueryString("");
    setSearchType(EnumSearchType.Keywords);
    props.onReset();
  };
  const onInputChange = (event: any, value: string) => {
    if (!event?.type || event.type !== "change") {
      // click events dont trigger get autoComplete
      return;
    }
    setQueryString(value);
    getAutoComplete(value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onClickSearch();
  };

  const getAutoComplete = async (value: string) => {
    if (value === "" || value.length < 2) {
      setOptions([]);
      return;
    }
    setOptionsLoading(true);
    console.debug("getting autoComplete for", value);
    // TODO: enable this when API is ready
    const suggestedItems = await searchAutocomplete(queryString);
    setOptions(suggestedItems.filter((item) => !!item));
    setOptionsLoading(false);
  };
  const onClickSearch = () => {
    props.onSearch(queryString, searchType);
    setOpen(false);
  };

  return (
    <Stack sx={{ width: "80%", margin: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <ResetIconTextButton onClick={resetFilters} />
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
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{
              width: "100%",
            }}
          >
            <StyledAutocomplete
              freeSolo
              options={options}
              value={queryString}
              onInputChange={onInputChange}
              loading={optionsLoading}
              onChange={(event: any, value: unknown) => {
                setQueryString(value as string);
              }}
              noOptionsText="No matching results"
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoComplete="off"
                  placeholder={t(
                    `scout.searchbar.${searchType.toLowerCase()}Placeholder`,
                    "..."
                  )}
                />
              )}
            />
            <button type="submit" style={{ display: "none" }}></button>
          </form>
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
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
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

export default SearchBar;
