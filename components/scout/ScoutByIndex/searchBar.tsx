import { useEffect, useState } from "react";
import { useSupplier } from "requests/useSupplier";

interface SearchBarProps {}

export enum SearchType {
  Keywords = "Keywords",
  Companies = "Companies",
}

const SearchBar = (props: SearchBarProps) => {
  const { searchAutocomplete } = useSupplier();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // Initialize language settings
    let currentLang = "en";
    if (
      typeof window !== "undefined" &&
      window !== undefined &&
      window.localStorage.getItem("i18nextLng")
    ) {
      currentLang =
        window.localStorage.getItem("i18nextLng") === "de" ? "de" : "en";
    }
    setLang(currentLang);
  }, []);

  const [queryString, setQueryString] = useState("");
  const [searchType, setSearchType] = useState<SearchType>(SearchType.Keywords);

  return <></>;
};

export default SearchBar;
