import dynamic from "next/dynamic";
import { styled as muiStyled } from "@mui/material/styles";
import { useCallback, useEffect, useState, useRef } from "react";
import NewsCard from "components/supplier-news/NewsCard";
import NewsCardSkeleton from "components/supplier-news/NewsCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useSupplierNews } from "requests/useSupplierNews";
import { theme } from 'config/theme';

const Layout = dynamic(() => import("components/Layout"));
const Header = dynamic(() => import("components/NewHeader"));

const Container = muiStyled('div')(`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    background-color: #edf1f3;
    @media (max-width: ${theme.size.mobileXl}) {
        margin-left: 16px;
        margin-right: 16px;
    }
    @media (min-width: ${theme.size.mobileXl}) {
        margin-left: 70px;
        margin-right: 70px;
        padding-bottom: 70px;
    }
`);

export default function SupplierNews() {
    const supplierNewsStore = useBoundStore((state) => state.supplierNews);
    const { news, page, pageSize, count, setPage } = supplierNewsStore;
    const { getSupplierNews, loading } = useSupplierNews();
    const [pageLoaded, setPageLoaded] = useState(false);
    const infiniteScrollControl = useRef(true);
    const pageRef = useRef(page);
    pageRef.current = page;
    const didCancel = useRef(false);
    didCancel.current = false;

    console.log(`count:${count} > page: ${page} * pageSize: ${pageSize}`);
    if (pageLoaded && count > page * pageSize && !infiniteScrollControl.current) {
        infiniteScrollControl.current = true;
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
        const getSupplierNewsHandler = async (didCancel: boolean) => {
            await getSupplierNews(page, didCancel);
        };
        getSupplierNewsHandler(didCancel);
        return () => { didCancel = true; };
    }, [page])

    return (
        <Layout>
            <Header title="Supplier News" />
            <Container id="supplier-news-container">
                {news && Array.isArray(news) && news.map((item) => <NewsCard key={item.id} {...item} />)}
                {loading && [1, 2, 3].map((value) => <NewsCardSkeleton key={value} />)}
                {!loading && !infiniteScrollControl.current && <span>No more news</span>}
            </Container>
        </Layout>
    );
}