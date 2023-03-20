import { styled as muiStyled } from "@mui/material/styles";
import { theme } from "config/theme";
import Feedback from "./Feedback";

const StyledHeader = muiStyled('div')(`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: ${theme.dimension.headerHeight};
    @media (max-width: ${theme.size.mobileXl}) {
        padding-left: 16px;
    }
    @media (min-width: ${theme.size.mobileXl}) {
        padding-left: 70px;
    }
`);

const TitleLabel = muiStyled('div')(`
    position: relative;
    left: 0px;
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 2rem;

    display: flex;
    align-items: center;
    color: #1A1A1A;
`);

type Props = {
  title?: string;
  onClick?: () => void;
}

const Header = function (props: Props) {
  const { title, onClick } = props;
  return (
    <StyledHeader>
      <TitleLabel>{title}</TitleLabel>
      <Feedback />
    </StyledHeader>
  );
}

export default Header;