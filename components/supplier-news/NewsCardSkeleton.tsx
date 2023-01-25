import { Box } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import { theme } from "config/theme";
import Skeleton from '@mui/material/Skeleton';


const Container = muiStyled(Box)(`
    display: flex;
    width: 100%;
    @media (max-width: ${theme.size.mobileXl}) {
        flex-direction: column;
        gap: 1rem;
    };
    @media (min-width: ${theme.size.mobileXl}) {
        flex-direction: row;
        gap: 1.5rem;
    };
    align-items: center;
    gap: 20px;
    padding: 2rem 1.375rem;
    cursor: pointer;
`);

const StyledImage = muiStyled(Skeleton)(`
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
`);

const TagLabel = muiStyled(Skeleton)(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
    text-overflow: ellipsis;
`);

const SummaryLabel = muiStyled(Skeleton)(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.375rem;
    text-overflow: ellipsis;
`);


const NewsCardSkeleton = function (props: { key: number }) {
    return (
        <Container key={props.key}>
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