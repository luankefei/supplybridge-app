import { Box } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";


export type InsightCardProps = {
    id?: any;
    title?: string | null;
    subjects?: [string] | null;
    image?: string | null;
    duration?: number | null;
    onClick?: (id: any) => void;
}

const Container = muiStyled(Box)(`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;
    background: #FFFFFF;
`);

const TopContainer = muiStyled('div')(`
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

const StyledImage = muiStyled('img')(`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    object-fit: cover;
`);

const BlurOverlay = muiStyled('div')(`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background: #022021;
    opacity: 0.7;
`);

const TitleLabel = muiStyled('span')(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.5rem;
    color: #FFFFFF;
    position: absolute;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    margin-top: 2rem;
`);

const Subjects = muiStyled('div')(`
    display: flex;
    margin-top: 1.375rem;
    overlay: hidden;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
`);


const StyledSubjectLabel = muiStyled('div')(`
    box-sizing: border-box;
    padding: 0.625rem;
    height: 2rem;
    background: #F9FAFB;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #4D4D4D;
`);

const SubjectLabel = function (props: { subject: string }) {
    return <StyledSubjectLabel>{props.subject}</StyledSubjectLabel>
}

const DurationLabel = muiStyled('span')(`
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #4D4D4D;
    padding: 0.625rem;
`);

const InsightCard = function (props: InsightCardProps) {
    const { id, title, subjects, image, duration } = props;

    return (
        <Container>
            <TopContainer>
                <StyledImage src={image as string | undefined}></StyledImage>
                <BlurOverlay />
                <TitleLabel>{title}</TitleLabel>
            </TopContainer>
            <BottomContainer>
                <Subjects>
                    {subjects && subjects.map((subject, index) => {
                        return (
                            <SubjectLabel key={`${subject}-${index}}`} subject={subject} />
                        );
                    })}
                </Subjects>
                <DurationLabel>{duration && `${duration} min read`}</DurationLabel>
            </BottomContainer>
        </Container>
    );
}

export default InsightCard;