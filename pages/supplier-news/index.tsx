import { styled as muiStyled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import NewsCard from "components/supplier-news/newsCard";
import NewsCardSkeleton from "components/supplier-news/newsCardSkeleton";
import { theme } from "config/theme";
import Layout from "components/layout";
import {
  EnumNewsCategory,
  INewsRelevancyModelWithNews,
} from "models/newsRelevancy";
import { cdsRequest } from "config/cdsAxio";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("supplierNews");
  const [news, setNews] = useState<INewsRelevancyModelWithNews[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [typeI, setTypeI] = useState(0);
  const categories = [
    EnumNewsCategory.INDUSTRY,
    EnumNewsCategory.SUPPLIER,
    EnumNewsCategory.RISK,
  ];

  const getNewsRelevancyData = async (
    name: string
  ): Promise<INewsRelevancyModelWithNews[]> => {
    try {
      const { data } = await cdsRequest.get(
        `data/news_gpt_processed?name=${encodeURIComponent(name)}`
      );
      return data || [];
    } catch (err: any) {
      console.error(err);
      return [];
    }
  };

  const fetchSupplierNews = async () => {
    setLoading(true);
    const data = await getNewsRelevancyData(categories[typeI]);
    data.sort(
      (a: INewsRelevancyModelWithNews, b: INewsRelevancyModelWithNews) =>
        new Date(b.NewsArticle.publishDate).getTime() -
        new Date(a.NewsArticle.publishDate).getTime()
    );
    setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSupplierNews();
  }, [typeI]);

  return (
    <Layout pageTitle="News">
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
              {t("industry")}
            </NewsTab>
            <NewsTab
              active={typeI === 1}
              activeId={typeI}
              onClick={() => setTypeI(1)}
            >
              {t("supplier")}
            </NewsTab>
            <NewsTab
              active={typeI === 2}
              activeId={typeI}
              onClick={() => setTypeI(2)}
            >
              {t("risk")}
            </NewsTab>
          </NewsTabContainer>
        </div>

        <Container id="supplier-news-container">
          {!loading &&
            news &&
            Array.isArray(news) &&
            news.map((item: INewsRelevancyModelWithNews) => {
              return (
                <NewsCard
                  key={item.id}
                  publishDate={item.NewsArticle.publishDate}
                  author={`${t("author")}: ${item.NewsArticle.author}`}
                  url={item.NewsArticle.url}
                  title={item.NewsArticle.title}
                  image={item.NewsArticle.image}
                  summary={item.summary}
                  tags={item.relevant_keywords || []}
                />
              );
            })}
          {loading &&
            [1, 2, 3].map((value) => <NewsCardSkeleton key={value} />)}
        </Container>
      </NewsContainer>
    </Layout>
  );
}
