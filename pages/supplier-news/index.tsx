import { styled as muiStyled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import NewsCard from "components/supplier-news/newsCard";
import NewsCardSkeleton from "components/supplier-news/newsCardSkeleton";
import { getNewsData, getNewsRelevancyData } from "requests/useSupplierNews";
import { theme } from "config/theme";
import Layout from "components/layout";
import {
  EnumNewsCategory,
  INewsRelevancyModelWithNews,
} from "models/newsRelevancy";
import { ToggleButton } from "@mui/material";
import { ENV, EnumENVIRONMENT } from "config";

const Container = muiStyled("div")(`
  width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
    gap: 1.25rem;
    background-color: #edf1f3;
    @media (max-width: ${theme.size.mobileXl}) {
    }
    @media (min-width: ${theme.size.mobileXl}) {
        margin-top: 20px;
        padding-bottom: 70px;
    }
`);

const NewsContainer = muiStyled("div")`
   max-width: 1280px;
   margin: 0 auto;
   padding: 0 32px;
`;

const Center = muiStyled("div")`
   position: fixed;
   z-index: 20;
   top: calc(50% - 67px);
   left: calc(50% + 10px);
   text-align: center;
`;

const NewsTabContainer = muiStyled("div")`
    display: flex;
    align-items: center;

   border-radius: 50px;
   background-color: white;
   padding: 10px;
   width: 480px;
   height: 48px;
   margin: 20px 0 0 0;
   position: relative;
`;
const NewsTab = muiStyled("div")<any>`
display: flex;
align-items: center;
justify-content: center;
   cursor: pointer;
   width: 160px;
   padding: 12px;
   border-radius: 50px;
   position: relative;
   z-index: 100;
   color: ${(props) => (props.active ? "white" : "#9CA3AF")};
`;
// background-color: ${(props) => (props.active ? "#08979c" : "transparent")};
//    color: ${(props) => (props.active ? "white" : "black")};

//
//margin-left: ${(props) => (props.activeId == 0 ? "-7px" : "unset")};
// margin-right: ${(props) => (props.activeId == 2 ? "-7px" : "unset")};

const newsTabLeft = ["4px", "160px", "316px"];

export default function SupplierNews() {
  const [news, setNews] = useState<any>(null);

  const [toggleGPTNews, setToggleGPTNews] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeI, setTypeI] = useState(0);
  const categories = [
    EnumNewsCategory.INDUSTRY,
    EnumNewsCategory.SUPPLIER,
    EnumNewsCategory.RISK,
  ];
  const archived = ["trend", "supplier", "risk"];

  const fetchSupplierNews = async () => {
    let data;
    setLoading(true);
    if (toggleGPTNews) {
      data = await getNewsRelevancyData(categories[typeI]);
      data.sort(
        (a: INewsRelevancyModelWithNews, b: INewsRelevancyModelWithNews) =>
          new Date(b.NewsArticle.publishDate).getTime() -
          new Date(a.NewsArticle.publishDate).getTime()
      );
    } else {
      data = await getNewsData(archived[typeI]);
    }
    setNews(data as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchSupplierNews();
  }, [typeI, toggleGPTNews]);

  return (
    <Layout pageTitle="News">
      {ENV === EnumENVIRONMENT.development && (
        <ToggleButton
          value={toggleGPTNews}
          selected={toggleGPTNews}
          onChange={() => setToggleGPTNews(!toggleGPTNews)}
        >
          ToggleNewsSource To GPT
        </ToggleButton>
      )}
      <NewsContainer>
        <div style={{ width: "100%", display: "flex", padding: "0 32px" }}>
          {/* 70.375rem: this is the same as newsCard container width, so the news list and newsTab are left-aligned */}
          <NewsTabContainer>
            <div
              style={{
                height: "40px",
                width: "160px", // newsTabWidth[typeI],
                left: newsTabLeft[typeI],
                background: "#08979c",
                // top: "4px",
                position: "absolute",
                borderRadius: "50px",
                zIndex: 50,
                transition: "all 0.2s",
              }}
            >
              {" "}
            </div>
            <NewsTab
              active={typeI === 0}
              activeId={typeI}
              onClick={() => setTypeI(0)}
            >
              Industry & Trend
            </NewsTab>
            <NewsTab
              active={typeI === 1}
              activeId={typeI}
              onClick={() => setTypeI(1)}
            >
              Supplier
            </NewsTab>
            <NewsTab
              active={typeI === 2}
              activeId={typeI}
              onClick={() => setTypeI(2)}
            >
              Risk
            </NewsTab>
          </NewsTabContainer>
        </div>

        <Container id="supplier-news-container">
          {!loading &&
            news &&
            Array.isArray(news) &&
            news.map((item: any) => {
              if (toggleGPTNews) {
                return <NewsCard key={item.id} {...item.NewsArticle} />;
              }
              return <NewsCard key={item.id} {...item} />;
            })}
          {loading &&
            [1, 2, 3].map((value) => <NewsCardSkeleton key={value} />)}
        </Container>
      </NewsContainer>
    </Layout>
  );
}
