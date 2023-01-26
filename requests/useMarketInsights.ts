import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "config/axios";
import useBoundStore from "hooks/useBoundStore";

const dummySample = [
    {
        id: 1,
        title: "EV Battery Recycling & Reuse : Strategies around the globe 2023",
        subjects: ["EV", "Recycling"],
        image: "/images/market-insights-1.png",
        duration: 5,
    },
    {
        id: 2,
        title: "Global Pandemics & Geopolitical Tensions that will shift Procurement Strategy : 3 years outlook",
        subjects: ["Procurement", "Strategy"],
        image: "/images/market-insights-2.png",
        duration: 7,
    },
    {
        id: 3,
        title: "Urban Mobility : how SUMP (Sustainable Urban Mobility Planning) affect Automakers product strategy",
        subjects: ["Mobility", "Car Features"],
        image: "/images/market-insights-3.png",
        duration: 5,
    },
    {
        id: 4,
        title: "Tier 1 & Tier2 Suppliers lining up for the eVTOL",
        subjects: ["Flying Car", "Suppliers"],
        image: "/images/market-insights-4.png",
        duration: 3,
    },
    {
        id: 5,
        title: "CO2 Emission Regulations and Value Chain Footprint Study",
        subjects: ["CO2 Emission", "Global Regulations"],
        image: "/images/market-insights-5.png",
        duration: 8,
    },
    {
        id: 6,
        title: "The nano material startups that will disrupt the Automotive Industry: In-depth Analysis",
        subjects: ["Material", "Nano Technology"],
        image: "/images/market-insights-6.png",
        duration: 3,
    },
    {
        id: 7,
        title: "EV Battery Recycling & Reuse : Strategies around the globe 2023",
        subjects: ["EV", "Recycling"],
        image: "/images/market-insights-1.png",
        duration: 5,
    },
    {
        id: 8,
        title: "Global Pandemics & Geopolitical Tensions that will shift Procurement Strategy : 3 years outlook",
        subjects: ["Procurement", "Strategy"],
        image: "/images/market-insights-2.png",
        duration: 7,
    },
    {
        id: 9,
        title: "Urban Mobility : how SUMP (Sustainable Urban Mobility Planning) affect Automakers product strategy",
        subjects: ["Mobility", "Car Features"],
        image: "/images/market-insights-3.png",
        duration: 5,
    },
    {
        id: 10,
        title: "Tier 1 & Tier2 Suppliers lining up for the eVTOL",
        subjects: ["Flying Car", "Suppliers"],
        image: "/images/market-insights-4.png",
        duration: 3,
    },
    {
        id: 11,
        title: "CO2 Emission Regulations and Value Chain Footprint Study",
        subjects: ["CO2 Emission", "Global Regulations"],
        image: "/images/market-insights-5.png",
        duration: 8,
    },
    {
        id: 12,
        title: "The nano material startups that will disrupt the Automotive Industry: In-depth Analysis",
        subjects: ["Material", "Nano Technology"],
        image: "/images/market-insights-6.png",
        duration: 3,
    },
    {
        id: 13,
        title: "EV Battery Recycling & Reuse : Strategies around the globe 2023",
        subjects: ["EV", "Recycling"],
        image: "/images/market-insights-1.png",
        duration: 5,
    },
    {
        id: 14,
        title: "Global Pandemics & Geopolitical Tensions that will shift Procurement Strategy : 3 years outlook",
        subjects: ["Procurement", "Strategy"],
        image: "/images/market-insights-2.png",
        duration: 7,
    },
    {
        id: 15,
        title: "Urban Mobility : how SUMP (Sustainable Urban Mobility Planning) affect Automakers product strategy",
        subjects: ["Mobility", "Car Features"],
        image: "/images/market-insights-3.png",
        duration: 5,
    },
    {
        id: 16,
        title: "Tier 1 & Tier2 Suppliers lining up for the eVTOL",
        subjects: ["Flying Car", "Suppliers"],
        image: "/images/market-insights-4.png",
        duration: 3,
    },
    {
        id: 17,
        title: "CO2 Emission Regulations and Value Chain Footprint Study",
        subjects: ["CO2 Emission", "Global Regulations"],
        image: "/images/market-insights-5.png",
        duration: 8,
    },
    {
        id: 18,
        title: "The nano material startups that will disrupt the Automotive Industry: In-depth Analysis",
        subjects: ["Material", "Nano Technology"],
        image: "/images/market-insights-6.png",
        duration: 3,
    }
];


const prepareDummyData = (offset: number, limit: number) => {
    let dummyData = [];
    for (let id = 1; id < limit + 1; id++) {
        const newId = offset + id;
        dummyData.push({ ...dummySample[id - 1], id: newId });
    }

    return { marketNews: dummyData, count: Math.min(50, dummyData.length + offset + 1) }
}

export const useMarketInsights = () => {
    const [loading, setLoading] = useState(false);
    const marketInsights = useBoundStore((state) => state.marketInsights);
    const { page, pageSize, setCount, setNews } = marketInsights;

    const getMarketInsights = async (currentPage: number = page, didCancel?: boolean) => {
        try {
            if (loading) return;
            console.log("getMarketInsights - called");
            setLoading(true);
            const searchParam = {
                offest: (currentPage - 1) * pageSize,
                limit: pageSize,
            }

            // TODO: Request to get supplier news with search param.
            const response = prepareDummyData(searchParam.offest, searchParam.limit);

            if (!didCancel) {
                // Update state
                setNews(response.marketNews);
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

    return { getMarketInsights, loading };
}