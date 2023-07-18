import dynamic from "next/dynamic";
import { styled as muiStyled } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import NewsCard from "components/supplier-news/NewsCard";
import NewsCardSkeleton from "components/supplier-news/NewsCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useSupplierNews } from "requests/useSupplierNews";
import { theme } from 'config/theme';
import console from "utils/console";
import UnlockBox from "components/UnlockBox";

const Layout = dynamic(() => import("components/Layout"));

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
        margin-top: 20px;
        padding-bottom: 70px;
    }
`);

const Center = muiStyled('div')`
   position: fixed;
   z-index: 20;
   top: calc(50% - 67px);
   left: calc(50% + 10px);
   text-align: center;
`;

const NewsTabContainer = muiStyled('div')`
   border-radius: 8px;
   background-color: white;
   padding: 10px;
   width: fit-content;
   margin: 10px auto;
`;
const NewsTab = muiStyled('a')<any>`
   cursor: pointer;
   margin: 0 25px;
   padding: 8px;
   border-radius: 8px;
   background-color: ${(props) => props.active ? '#08979c': 'transparent'};
   color: ${(props) => props.active ? 'white': 'black'};
`;

export default function SupplierNews() {
    const supplierNewsStore = useBoundStore((state) => state.supplierNews);
    const [ news, setNews ] = useState([]);
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
            <NewsTabContainer>
               <NewsTab active={typeI===0} onClick={() => setTypeI(0)}>Trending</NewsTab>
               <NewsTab active={typeI===1} onClick={() => setTypeI(1)}>Supplier</NewsTab>
               <NewsTab active={typeI===2} onClick={() => setTypeI(2)}>Risk</NewsTab>
            </NewsTabContainer>
            <Container id="supplier-news-container">
                {news && Array.isArray(news) && news.map((item: any) => <NewsCard key={item.id} {...item} />)}
                {loading && [1, 2, 3].map((value) => <NewsCardSkeleton key={value} />)}
                {/* {!loading && !infiniteScrollControl.current && <span>No more news</span>} */}
            </Container>
        </Layout>
    );
}
