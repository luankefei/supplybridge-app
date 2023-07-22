import { Box } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import Skeleton from '@mui/material/Skeleton';

const Container = muiStyled(Box)(`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;
    background: #FFFFFF;
`);

const TopContainer = muiStyled(Skeleton)(`
    height: 15.625rem;
    position: relative;
    top: 0px;
    left: 0px;
    right: 0px;
`);

const BottomContainer = muiStyled('div')(`
    height: 5.625rem;
    position: relative;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-direction: column;
    gap: 0.25rem;
`);

const Subjects = muiStyled(Skeleton)(`
    display: flex;
    margin-top: 1.375rem;
    height: 3rem;
    overlay: hidden;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
`);

const DurationLabel = muiStyled(Skeleton)(`
    position: relative;
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