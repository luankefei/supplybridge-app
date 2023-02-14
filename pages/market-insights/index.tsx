import { styled as muiStyled } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import InsightCard from "components/market-insights/InsightCard";
import InsightCardSkeleton from "components/market-insights/InsightCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useMarketInsights } from "requests/useMarketInsights";
import { theme } from "config/theme";
import Layout from "components/Layout";
import Header from "components/NewHeader";
import console from "utils/console";

const Container = muiStyled('div')(`
    display: grid;
    grid-auto-rows: 21.25rem;
    grid-column-gap: 42px;
    grid-row-gap: 60px;
    justify-content: center;
    background-color: #edf1f3;

    @media (max-width: ${theme.size.tablet}) {
        grid-template-columns: repeat(auto-fill, 1fr);
        margin-top: 60px;
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 60px;
    };
    @media (min-width: ${theme.size.tablet}) {
        // grid-template-columns: repeat(auto-fill, minmax(24.375rem, 1fr));
        grid-template-columns: repeat(2, 24.375rem);
        margin-top: 60px;
        margin-left: 60px;
        margin-right: 60px;
        margin-bottom: 60px;
    }
`);

export default function MarketInsights() {
    const marketInsightsStore = useBoundStore((state) => state.marketInsights);
    const { news, page, pageSize, count, setPage } = marketInsightsStore;
    const { getMarketInsights, loading } = useMarketInsights();
    const [pageLoaded, setPageLoaded] = useState(false);
    const infiniteScrollControl = useRef(true);
    const pageRef = useRef(page);
    pageRef.current = page;

    if (pageLoaded) {
        console.log(`count:${count} > page: ${page} * pageSize: ${pageSize}`);
        const needed = count > page * pageSize;
        infiniteScrollControl.current = needed;
    }

    useEffect(() => {
        if (pageLoaded) return;
        setPageLoaded(true);

        const handleScroll = async () => {
            var isAtBottom = document.documentElement.scrollHeight -
                document.documentElement.scrollTop <=
                document.documentElement.clientHeight;
            if (isAtBottom && infiniteScrollControl.current) {
                infiniteScrollControl.current = false;
                setPage(pageRef.current + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [setPage]);

    useEffect(() => {
        let didCancel = false;
        const getMarketInsightsHandler = async (didCancel: boolean) => {
            await getMarketInsights(page, didCancel);
        };
        getMarketInsightsHandler(didCancel);
        return () => { didCancel = true; };
    }, [page]);

    return (
        <Layout>
            <Header />
            <Container id="market-insights-container">
                {news && Array.isArray(news) && news.map((item) => <InsightCard key={item.id} {...item} />)}
                {loading && [1, 2, 3].map((index) => <InsightCardSkeleton key={index} />)}
            </Container>
            {/* {!loading && !infiniteScrollControl.current &&
                <span style={{
                    marginTop: "3.75rem",
                    marginBottom: "3.75rem",
                    width: "100%",
                    display: "block",
                    textAlign: "center",
                }}>
                    No more news
                </span>} */}
        </Layout >
    );
}