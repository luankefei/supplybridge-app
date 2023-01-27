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

const FeedbackContainer = muiStyled('div')(`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    
    position: absolute;
    width: 5.5rem;
    height: 1.875rem;
    right: -1.8125rem;
    top: 4.1875rem;
    background: #C41D7F;
    border-radius: 1rem 1rem 0px 0px;
    transform: rotate(-90deg);

    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.375rem;
    color: #FFFFFF;
    cursor: pointer;
`);

const FeedbackLabel = muiStyled('div')(`
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
            <FeedbackContainer onClick={onClick}>
                FEEDBACK
            </FeedbackContainer>
        </StyledHeader>
    );
}

export default Header;