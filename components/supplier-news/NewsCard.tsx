import { Box } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import { theme } from "config/theme";

export type NewsCardProps = {
    id?: any;
    date?: string | null;
    title?: string | null;
    tags?: [string] | null;
    summary?: string | null;
    image?: string | null;
    onClick?: (id: any) => void;
}


const Container = muiStyled(Box)(`
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
`);

const StyledImage = muiStyled('img')(`
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
    overflow: hidden;
`);

const DateLabel = muiStyled('span')(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #8C8C8C;
`);

const TitleLabel = muiStyled('span')(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.5rem
    color: #1F1F1F;
`);

const Tags = muiStyled('div')(`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
`);

const TagLabel = muiStyled('span')(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #08979C;
    text-overflow: ellipsis;
`);

const SummaryLabel = muiStyled('span')(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.375rem;
    color: #8C8C8C;
    text-overflow: ellipsis;
`);

const StyledReadMore = muiStyled(`div`)(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1.375rem;
    
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    color: #08979C;
`);


const NewsCard = function (props: NewsCardProps) {
    const { id, date, title, tags, summary, image } = props;

    return (
        <Container>
            <StyledImage src={image as string | undefined}></StyledImage>
            <Contents>
                <DateLabel>{date}</DateLabel>
                <TitleLabel>{title}</TitleLabel>
                <Tags>
                    {tags && tags.map((tag, index) => {
                        return (
                            <TagLabel key={`${tag}-${index}`}>#{tag}</TagLabel>
                        );
                    })}
                </Tags>
                <SummaryLabel>{summary}</SummaryLabel>
                <StyledReadMore>
                    <span>Read More</span>
                    <img src="/Icons/right-arrow.svg" alt="->" />
                </StyledReadMore>
            </Contents>
        </Container>
    );
}

export default NewsCard;