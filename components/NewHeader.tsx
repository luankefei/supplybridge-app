import { styled as muiStyled } from "@mui/material/styles";
import { theme } from "config/theme";

const StyledHeader = muiStyled('div')(`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: ${theme.size.header};
    @media (max-width: ${theme.size.mobileXl}) {
        padding-left: 16px;
        padding-right: 16px;
    }
    @media (min-width: ${theme.size.mobileXl}) {
        padding-left: 70px;
        padding-right: 70px;
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

const HelpContainer = muiStyled('div')(`
    cursor: pointer;
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.375rem;

    color: #2C71F0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-right;
    gap: 12px;
`);

const Icon = muiStyled('img')(`
    width: 1.5rem;
    height: 1.5rem;
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
            <HelpContainer onClick={onClick}>
                <Icon src="/icons/question-circle.svg" alt="question mark" />
                <span>Help & Feedback</span>
            </HelpContainer>
        </StyledHeader>
    );
}

export default Header;