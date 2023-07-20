import { Switch } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const handleChange = () => {
    if (i18n.language == "de") {
      changeLanguage("en");
    } else {
      changeLanguage("de");
    }
  };
  const checked = i18n.language == "de" ? true : false;
  return (
    <SearchLangContainer label={i18n.language}>
      <Switch checked={checked} onChange={handleChange} />
    </SearchLangContainer>
  );
};

const SearchLangContainer = styled.div<{ label: string }>`
  width: 200px;
  position: absolute;
  top: 40px;
  right: 2px;
  & .MuiSwitch-root {
    padding: 0;
    margin-bottom: 3px;
    width: 100px;
    border-radius: 50px;
  }
  & .MuiSwitch-root > span.MuiSwitch-track {
    background-color: #ccc;
  }
  & .MuiSwitch-track:before {
    content: url(/flags/gb_with_label.svg);
    color: black;
    position: absolute;
    top: 10px;
    left: 5px;
  }
  & .MuiSwitch-track:after {
    content: url(/flags/de_with_label.svg);
    color: black;
    position: absolute;
    top: 10px;
    right: 6px;
  }
  & .MuiButtonBase-root {
    padding: 4px;
  }
  & .MuiSwitch-thumb {
    width: 50px;
    height: 30px;
    border-radius: 50px;
  }
  & .MuiTouchRipple-root:before {
    content: ${(props) =>
      `${
        props.label == "de"
          ? "url(/flags/de_with_label.svg)"
          : "url(/flags/gb_with_label.svg)"
      }`};
    position: absolute;
    color: black;
    top: 10px;
    left: 10px;
  }
  & .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked {
    color: white;
    margin-left: 20px;
  }
`;

export default LanguageSelector;
