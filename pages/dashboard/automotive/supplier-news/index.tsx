import { styled as muiStyled } from "@mui/material/styles";
import { useCallback, useEffect, useState, useRef } from "react";
import NewsCard from "components/supplier-news/NewsCard";
import NewsCardSkeleton from "components/supplier-news/NewsCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useSupplierNews } from "requests/useSupplierNews";

const Container = muiStyled('div')(`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    background-color: #edf1f3;
    margin: 60px 60px;
`);

export default function SupplierNews() {
    const supplierNewsStore = useBoundStore((state) => state.supplierNews);
    const { news, page, pageSize, count, setPage } = supplierNewsStore;
    const { getSupplierNews, loading } = useSupplierNews();
    const [pageLoaded, setPageLoaded] = useState(false);
    const infiniteScrollControl = useRef(true);
    const pageRef = useRef(page);
    pageRef.current = page;

    const getSupplierNewsHandler = useCallback(async (didCancel: boolean) => {
        await getSupplierNews(page, didCancel);
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
        getSupplierNewsHandler(didCancel);
        return () => { didCancel = true; };
    }, [getSupplierNewsHandler])

    return (
        <Container id="supplier-news-container">
            {news && Array.isArray(news) && news.map((item) => <NewsCard key={item.id} {...item} />)}
            {loading && [1, 2, 3].map((index) => <NewsCardSkeleton key={index} />)}
            {!loading && !infiniteScrollControl.current && <span>No more news</span>}
        </Container>
    );
}