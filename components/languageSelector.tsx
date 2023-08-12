import { Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface ILanguageSelectorProps {
  type?: "icon" | "plain";
}

const LanguageSelector = ({ type }: ILanguageSelectorProps) => {
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
  if (!type || type == "icon") {
    return (
      <SearchLangContainer label={i18n.language}>
        <Switch checked={checked} onChange={handleChange} />
      </SearchLangContainer>
    );
  } else {
    return (
      <StyledToggleButtonGroup>
        <StyledToggleButton
          value="en"
          selected={i18n.language == "en" ? true : false}
          onClick={() => changeLanguage("en")}
        >
          EN
        </StyledToggleButton>
        <StyledToggleButton
          value="de"
          selected={i18n.language == "de" ? true : false}
          onClick={() => changeLanguage("de")}
        >
          DE
        </StyledToggleButton>
      </StyledToggleButtonGroup>
    );
  }
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  && {
    padding: 2px;
    height: 32px;
    border-radius: 16px;
    background-color: #E5E7EB;
  }

  & .MuiToggleButtonGroup-grouped: {
    margin: 5,
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: 16px,
    },
    "&:first-of-type": {
      borderRadius: 16px,
    },
  },
`;

const StyledToggleButton = styled(ToggleButton)`
  && {
    border-radius: 16px;
    padding: 4px;
    color: #9ca3af;

    &.Mui-selected {
      background-color: white;
    }
    & .MuiToggleButton-root {
      border-radius: 16px;
    }
  }
`;

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
