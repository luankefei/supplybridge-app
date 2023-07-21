import { Box } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import { theme } from "config/theme";
import Skeleton from '@mui/material/Skeleton';


const Container = muiStyled(Box)(`
    width: calc(100%);
    display: flex;
    @media (max-width: ${theme.size.mobileXl}) {
        flex-direction: column;
        gap: 1rem;
    };
    @media (min-width: ${theme.size.mobileXl}) {
        flex-direction: row;
        gap: 1.5rem;
    };
    align-items: center;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    border-radius: 1rem;
    padding: 2rem 1.375rem;
    cursor: pointer;
    background-color: #FFFFFF;
`);

const StyledImage = muiStyled(Skeleton)(`
    flex-shrink: 0;
    overflow: hidden;
    @media (max-width: ${theme.size.mobileXl}) {
        width: 100%;
        height: 10rem;
    };
    @media (min-width: ${theme.size.mobileXl}) {
        width: 9.875rem;
        height: 7.375rem;
    };
    object-fit: cover;
`);

const Contents = muiStyled('div')(`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1.5rem;
    gap: 4px;
    overflow: hidden;
`);

const DateLabel = muiStyled(Skeleton)(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #8C8C8C;
`);

const TitleLabel = muiStyled(Skeleton)(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.5rem
    color: #1F1F1F;
    @media (min-width: ${theme.size.mobileXl}) {
        width: calc(100%);
        overflow:hidden;
        white-space:nowrap;
        display:inline-block;
        text-overflow:ellipsis;
    };
`);

const TagLabel = muiStyled(Skeleton)(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
`);

const SummaryLabel = muiStyled(Skeleton)(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.375rem;
    @media (min-width: ${theme.size.mobileXl}) {
        width: calc(100%);
        overflow:hidden;
        white-space:nowrap;
        display:inline-block;
        text-overflow:ellipsis;
    };
`);

const NewsCardSkeleton = function () {
    return (
        <Container> 
            <StyledImage variant="rectangular" />
            <Contents>
                <DateLabel width="10%" />
                <TitleLabel width="100%" />
                <TagLabel width="60%" />
                <SummaryLabel width="100%" />
            </Contents>
        </Container>
    );
}

export default NewsCardSkeleton;