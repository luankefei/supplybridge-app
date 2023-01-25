import { Box } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import Skeleton from '@mui/material/Skeleton';

const Container = muiStyled(Box)(`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(24.375rem, 1fr));
    grid-auto-rows: minmax(5.625rem, auto);
    grid-column-gap: 2.625rem;
    grid-column-gap: 3.75rem;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    border-radius: 1rem;
    cursor: pointer;
    overlay: hidden;
`);

const TopContainer = muiStyled(Skeleton)(`
    height: 15.625rem;
    top: 0;
    left: 0;
    right: 0;
`);

const BottomContainer = muiStyled('div')(`
    height: 5.625rem;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
`);

const TitleLabel = muiStyled('span')(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.5rem
    color: #FFFFFF;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 2rem;
`);

const Subjects = muiStyled(Skeleton)(`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
`);

const DurationLabel = muiStyled(Skeleton)(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #4D4D4D;
    padding: 0.625rem;
`);

const InsightCardSkeleton = function () {
    return (
        <Container>
            <TopContainer variant="rectangular">
            </TopContainer>
            <BottomContainer>
                <Subjects width="60%" />
                <DurationLabel width="30%" />
            </BottomContainer>
        </Container>
    );
}

export default InsightCardSkeleton;