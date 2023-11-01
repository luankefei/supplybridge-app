import {
  Autocomplete,
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Icon from "components/icon";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSupplier } from "requests/useSupplier";
import styled from "styled-components";
import { SpacingHorizontal } from "components/ui-components/spacer";
import { ResetIconTextButton } from "components/ui-components/iconTextButton";
import { useStore } from "hooks/useStore";

interface SearchBarProps {
  searchType?: EnumSearchType;
  queryString?: string;
  onSearch: (queryString: string, searchType: EnumSearchType) => void;
  onReset: () => void;
}

export enum EnumSearchType {
  Keywords = "Keywords",
  Companies = "Companies",
}

const maxShowSuggestionNum = 10;

/**
 * The search bar component for the scout page.
 * -- this component controls its own SearchType and queryString state
 * -- all results are passed back to the parent component by calling the onSearch callback
 */
const SearchBar = (props: SearchBarProps) => {
  const { t } = useTranslation();
  const { setPage } = useStore();
  const { searchAutocomplete } = useSupplier();
  const timer = useRef<NodeJS.Timeout>();

  const [queryString, setQueryString] = useState("");
  useEffect(() => {
    setQueryString(props.queryString || "");
  }, [props.queryString]);

  useEffect(() => {
    setSearchType(props.searchType || EnumSearchType.Keywords);
  }, [props.searchType]);

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
    setPage(0);
    setOptions([]);
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
    if (value === "" || value.length < 3) {
      setOptions([]);
    }
    setQueryString(value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onClickSearch();
  };

  const getAutoComplete = useCallback(async (value: string) => {
    setOptionsLoading(true);
    console.debug("getting autoComplete for", value);
    const suggestedItems = await searchAutocomplete(value, searchType);
    setOptions(suggestedItems.filter((item) => !!item));
    setOptionsLoading(false);
  }, [searchAutocomplete, searchType]);

  const onClickSearch = () => {
    props.onSearch(queryString, searchType);
    setOpen(false);
  };

  useEffect(() => {
    const debounce = queryString ? 300 : 0
    if (queryString !== null && queryString !== undefined && queryString.length > 2) {
      timer.current = setTimeout(() => {
        getAutoComplete(queryString.trim())
      }, debounce)
    }

    return () => {
      if (timer.current) {

        setOptionsLoading(false);
        clearTimeout(timer.current);
      }
    }
  }, [queryString])

  const suggestions: string[] = useMemo(() => {
    if (searchType === EnumSearchType.Keywords) {
      return options.sort((a, b) => a > b ? 1 : -1).slice(0, maxShowSuggestionNum);
    }

    // For company search, we will show items that start with query as the first 5 items, and then the items that include quey.
    let _nameStarted: string[] = [];
    let _nameContains: string[] = [];

    options.forEach((o) => {
      if (o.toLowerCase().startsWith(queryString.toLowerCase())) {
        _nameStarted.push(o);
      } else if (o.toLowerCase().includes(queryString.toLowerCase())) {
        _nameContains.push(o);
      }
    });

    let pivot = Math.ceil(maxShowSuggestionNum / 2);
    if (_nameContains.length < maxShowSuggestionNum - pivot) {
      pivot = maxShowSuggestionNum - _nameContains.length;
    }
    _nameStarted = _nameStarted.sort((a, b) => a > b ? 1 : -1).slice(0, pivot);
    _nameContains = _nameContains.sort((a, b) => a > b ? 1 : -1).slice(0, maxShowSuggestionNum - _nameStarted.length);

    return [..._nameStarted, ..._nameContains];
  }, [options, queryString, searchType]);

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
              options={suggestions}
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
