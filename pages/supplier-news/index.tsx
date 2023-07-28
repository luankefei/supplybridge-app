import { styled as muiStyled } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import NewsCard from "components/supplier-news/newsCard";
import NewsCardSkeleton from "components/supplier-news/newsCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useSupplierNews } from "requests/useSupplierNews";
import { theme } from "config/theme";
import Layout from "components/layout";

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
   border-radius: 50px;
   background-color: white;
   padding: 10px;
   width: fit-content;
   margin: 20px 0 0 0;
   position: relative;
`;
const NewsTab = muiStyled("a")<any>`
   cursor: pointer;
   padding: 8px;
   border-radius: 50px;
   position: relative;
   z-index: 100;
   color: ${(props) => (props.active ? "white" : "#808080")};
`;
// background-color: ${(props) => (props.active ? "#08979c" : "transparent")};
//    color: ${(props) => (props.active ? "white" : "black")};

//
//margin-left: ${(props) => (props.activeId == 0 ? "-7px" : "unset")};
// margin-right: ${(props) => (props.activeId == 2 ? "-7px" : "unset")};

const newsTabWidth = ["148px", "80px", "56px"];
const newsTabLeft = ["4px", "150px", "226px"];

export default function SupplierNews() {
  const supplierNewsStore = useBoundStore((state) => state.supplierNews);
  const [news, setNews] = useState([]);
  const { getSupplierNews, loading } = useSupplierNews();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [typeI, setTypeI] = useState(0);

  useEffect(() => {
    (async () => {
      const rs = await getSupplierNews(typeI, 0);
      setNews(rs.news);
    })();
  }, [typeI]);

  return (
    <Layout>
      <NewsContainer>
        <div style={{ width: "100%", display: "flex", padding: "0 32px" }}>
          {/* 70.375rem: this is the same as newsCard container width, so the news list and newsTab are left-aligned */}
          <NewsTabContainer>
            <div
              style={{
                height: "32px",
                width: newsTabWidth[typeI],
                left: newsTabLeft[typeI],
                background: "#08979c",
                top: "4px",
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
          {news &&
            Array.isArray(news) &&
            news.map((item: any) => <NewsCard key={item.id} {...item} />)}
          {loading &&
            [1, 2, 3].map((value) => <NewsCardSkeleton key={value} />)}
          {/* {!loading && !infiniteScrollControl.current && <span>No more news</span>} */}
        </Container>
      </NewsContainer>
    </Layout>
  );
}
