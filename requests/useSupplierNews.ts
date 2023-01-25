import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "config/axios";
import useBoundStore from "hooks/useBoundStore";

const dummySample = {
    id: 1,
    date: "25 May 2022",
    title: "Thai floods harm key region for world’s rubber",
    tags: ["supplyChain", "climate", "tires"],
    summary: "Rubber farmers in Thailand’s south are counting the cost of extreme weather in the world’s top growing region.",
    image: "/images/video-img.jpg"
}

const prepareDummyData = (offset: number, limit: number) => {
    let dummyData = [];
    for (let id = 1; id < limit + 1; id++) {
        const newId = offset + id;
        dummyData.push({ ...dummySample, id: newId });
    }

    return { supplyerNews: dummyData, count: Math.min(100, dummyData.length + offset + 1) }
}

export const useSupplierNews = () => {
    const [loading, setLoading] = useState(false);
    const supplierNews = useBoundStore((state) => state.supplierNews);
    const { page, pageSize, setCount, setNews } = supplierNews;

    const getSupplierNews = async (currentPage: number = page, didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getSupplierNews - called");
            setLoading(true);
            const searchParam = {
                offest: (currentPage - 1) * pageSize,
                limit: pageSize,
            }

            // TODO: Request to get supplier news with search param.
            const response = prepareDummyData(searchParam.offest, searchParam.limit);

            if (!didCancel) {
                // Update state
                setNews(response.supplyerNews);
                setCount(response.count);
                setLoading(false);
            }

        } catch (err: any) {
            if (!didCancel) {
                setLoading(false);
            }
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    return { getSupplierNews, loading };
}