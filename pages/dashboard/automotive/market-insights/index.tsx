import { styled as muiStyled } from "@mui/material/styles";
import { useCallback, useEffect, useState, useRef } from "react";
import InsightCard from "components/market-insights/InsightCard";
import InsightCardSkeleton from "components/market-insights/InsightCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useMarketInsights } from "requests/useMarketInsights";
import { theme } from "config/theme";

const Container = muiStyled('div')(`
    display: grid;
    grid-auto-rows: 21.25rem;
    grid-column-gap: 2.625rem;
    grid-row-gap: 3.75rem;
    background-color: #edf1f3;

    @media (max-width: ${theme.size.mobileXl}) {
        grid-template-columns: repeat(auto-fill, 1fr);
        margin-top: 160px;
        margin-left: 20px;
        margin-right: 20px;
    };
    @media (min-width: ${theme.size.mobileXl}) {
        grid-template-columns: repeat(auto-fill, minmax(24.375rem, 1fr));
        margin-top: 160px;
        margin-left: 160px;
        margin-right: 160px;
    }
`);

export default function marketInsights() {
    const marketInsightsStore = useBoundStore((state) => state.marketInsights);
    const { news, page, pageSize, count, setPage } = marketInsightsStore;
    const { getMarketInsights, loading } = useMarketInsights();
    const [pageLoaded, setPageLoaded] = useState(false);
    const infiniteScrollControl = useRef(true);
    const pageRef = useRef(page);
    pageRef.current = page;

    const getMarketInsightsHandler = useCallback(async (didCancel: boolean) => {
        await getMarketInsights(page, didCancel);
    }, [page])

    console.log(`count:${count} > page: ${page} * pageSize: ${pageSize}`);
    if (pageLoaded && count > page * pageSize && !infiniteScrollControl.current) {
        infiniteScrollControl.current = true;
    }

    const handleScroll = async () => {
        var isAtBottom = document.documentElement.scrollHeight -
            document.documentElement.scrollTop <=
            document.documentElement.clientHeight;
        if (isAtBottom && infiniteScrollControl.current) {
            infiniteScrollControl.current = false;
            setPage(pageRef.current + 1);
        }
    };

    useEffect(() => {
        if (pageLoaded) return;
        setPageLoaded(true);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        let didCancel = false;
        getMarketInsightsHandler(didCancel);
        return () => { didCancel = true; };
    }, [getMarketInsightsHandler])

    return (
        <div>
            <Container id="market-insights-container">
                {news && Array.isArray(news) && news.map((item) => <InsightCard key={item.id} {...item} />)}
                {loading && [1, 2, 3].map((index) => <InsightCardSkeleton key={index} />)}
            </Container>
            {!loading && !infiniteScrollControl.current &&
                <span style={{
                    marginTop: "3.75rem",
                    marginBottom: "3.75rem",
                    width: "100%",
                    display: "block",
                    textAlign: "center",
                }}>
                    No more news
                </span>}
        </div >
    );
}