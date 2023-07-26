import { Box } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import { theme } from "config/theme";
import Image from "next/image";
import { allCountry } from "utils/countries";

const Container = muiStyled(Box)(`
    width: min(calc(100%), 70.375rem);
    max-width: 1000px;
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

const StyledImage = muiStyled("img")(`
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

const Contents = muiStyled("div")(`
    flex-shrink: 10;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
    overflow: hidden;
`);

const DateLabel = muiStyled("div")(`
    display: flex;
    justify-content: space-between;
    aligne-items: center;
    width: 100%;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.25rem;

    .author {
       float: right;
    }
    .author:after {
       clear: both;
    }
`);

const TitleLabel = muiStyled("span")(`
    margin: 8px 0;
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
    > a {
       text-decoration: none;
    }
`);

const Tags = muiStyled("div")(`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
`);

const TagLabel = muiStyled("span")(`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #08979C;
`);

const SummaryLabel = muiStyled("span")(`
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
`);

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.abs((now.getTime() - date.getTime()) / 1000);
  const diffInHours = diffInSeconds / 3600;

  if (diffInHours < 24) {
    if (diffInSeconds < 60) return `${Math.round(diffInSeconds)} seconds ago`;
    else if (diffInSeconds < 3600)
      return `${Math.round(diffInSeconds / 60)} minutes ago`;
    else return `${Math.round(diffInHours)} hours ago`;
  } else {
    return date.toLocaleString();
  }
}

const NewsCard = function (props: any) {
  const { id, publishDate, title, k1, url, text, image, country, author } =
    props;
  const tags = [k1];
  const summary =
    text && text.substring(0, 300) + (text.length > 300 ? " ..." : "");
  const displayedCountry = country
    ? allCountry
        .map((z: any) =>
          z.children.find((x: any) => x.name === country.toUpperCase())
        )
        .filter((x: any) => !!x)[0]
    : "";

  return (
    <Container>
      {/*<StyledImage src={image} alt={``} width={158} height={118}></StyledImage>*/}
      <Contents>
        <DateLabel>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <div style={{ color: "#9CA3AF" }}>{formatDate(publishDate)}</div>
              <div>&nbsp;&nbsp;&#183;&nbsp;</div>
            </div>

            {displayedCountry ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/icons/location2.svg"
                  alt="news_source-location"
                  width={16}
                  height={16}
                />
                <span style={{ color: "#445B66" }}>
                  {displayedCountry?.fullName}{" "}
                </span>
              </div>
            ) : null}
          </div>
          <div style={{ color: "#445B66" }}>
            {author ? <span className="author">Source: {author}</span> : null}
          </div>
        </DateLabel>
        <TitleLabel>
          <a href={url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </TitleLabel>
        <Tags>
          {tags &&
            tags.map((tag: any, index: number) => {
              return <TagLabel key={`${tag}-${index}`}>#{tag}</TagLabel>;
            })}
        </Tags>
        {/*<SummaryLabel>{summary}</SummaryLabel>*/}
        {/*<StyledReadMore>
                    <span>Read More</span>
                    <Image src="/icons/right-arrow.svg" alt="->" width={24} height={24} />
                </StyledReadMore>*/}
      </Contents>
    </Container>
  );
};

export default NewsCard;
