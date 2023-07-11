import { styled as muiStyled } from "@mui/material/styles";
import { theme } from "config/theme";
import Feedback from "./Feedback";
import Icon from "./Icon";

const StyledHeader = muiStyled("div")(`
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

const SubtitleLabel = muiStyled("div")(`
font-family: 'Ubuntu';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 1.5rem;

display: flex;
align-items: center;
color: #1A1A1A;
`);

const Header = function ({
  title,
  subtitle,
  subtitleIcon,
}: {
  title?: string;
  subtitle?: string;
  subtitleIcon?: string;
}) {
  return (
    <StyledHeader>
      <Container>
        <TitleLabel>{title}</TitleLabel>
        <SubtitleLabel>
          {subtitleIcon && <Icon width={24} src={subtitleIcon} />}
          <span style={{ marginLeft: 8 }}>{subtitle}</span>
        </SubtitleLabel>
      </Container>
      <Feedback />
    </StyledHeader>
  );
};

export default Header;
