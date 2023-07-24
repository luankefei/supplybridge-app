import { styled as muiStyled } from "@mui/material/styles";
import { theme } from "config/theme";
import Feedback from "./feedback";

const StyledHeader = muiStyled("div")(`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: ${theme.dimension.headerHeight};
`);

const Container = muiStyled("div")(`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
`);

const TitleLabel = muiStyled("div")(`
    position: relative;
    left: 0px;

    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 2rem;

    display: flex;
    align-items: center;
    color: #1A1A1A;
`);

const Header = function ({ title }: { title?: string }) {
  return (
    <StyledHeader>
      <Container>
        <TitleLabel>{title}</TitleLabel>
      </Container>
      <Feedback />
    </StyledHeader>
  );
};

export default Header;
