import { Box } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import { theme } from "config/theme";
import Image from "next/image";

const Container = muiStyled(Box)(`
    width: min(calc(100%), 64.375rem);
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

const StyledImage = muiStyled('img')(`
    flex-shrink: 0;
    overflow: hidden;
    @media (max-width: ${theme.size.mobileXl}) {
        width: calc(100%);
        height: 10rem;
    };
    @media (min-width: ${theme.size.mobileXl}) {
        width: 9.875rem;
        height: 7.375rem;
    };
    border-radius: 1rem;
    object-fit: cover;
`);

const Contents = muiStyled('div')(`
    flex-shrink: 10;
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
    line-height: 1.5rem;
    color: #1F1F1F;
    @media (min-width: ${theme.size.mobileXl}) {
        width: calc(100%);
        overflow:hidden;
        white-space:nowrap;
        display:inline-block;
        text-overflow:ellipsis;
    };
`);

const Tags = muiStyled('div')(`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
`);

const TagLabel = muiStyled('span')(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #08979C;
`);

const SummaryLabel = muiStyled('span')(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.375rem;
    color: #8C8C8C;
    @media (min-width: ${theme.size.mobileXl}) {
        width: calc(100%);
        overflow:hidden;
        white-space:nowrap;
        display:inline-block;
        text-overflow:ellipsis;
    };
`);

const StyledReadMore = muiStyled(`div`)(`
    > a {
       font-family: 'Inter';
       font-style: normal;
       font-weight: 500;
       font-size: 0.75rem;
       line-height: 1.375rem;
       text-decoration: none;
       
       display: flex;
       flex-direction: row;
       align-items: flex-end;
       color: #08979C;
    }
`);


const NewsCard = function (props: any) {
    const { id, publish_date, title, tags, url, text, image } = props;
    const summary = text && (text.substring(0, 300) + (text.length > 300 ? ' ...' : ''));

    return (
        <Container>
            <StyledImage src={image} alt={``} width={158} height={118}></StyledImage>
            <Contents>
                <DateLabel>{publish_date}</DateLabel>
                <TitleLabel>{title}</TitleLabel>
                <Tags>
                    {tags && tags.map((tag: any, index: number) => {
                        return (
                            <TagLabel key={`${tag}-${index}`}>#{tag}</TagLabel>
                        );
                    })}
                </Tags>
                <SummaryLabel>{summary}</SummaryLabel>
                <StyledReadMore><a href={url} target="_blank" rel="noreferrer">
                    <span>Read More</span>
                    <Image src="/icons/right-arrow.svg" alt="->" width={24} height={24} />
                </a></StyledReadMore>
            </Contents>
        </Container>
    );
}

export default NewsCard;
