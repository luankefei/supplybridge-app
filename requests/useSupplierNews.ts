import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "config/axios";
import useBoundStore from "hooks/useBoundStore";
import console from "utils/console";
import {
  EnumNewsCategory,
  INewsRelevancyModelWithNews,
} from "models/newsRelevancy";
import { cdsRequest } from "config/cdsAxio";

const dummySample = [
  {
    id: 1,
    date: "25 May 2022",
    title: "Thai floods harm key region for world’s rubber",
    tags: ["supplyChain", "climate", "tires"],
    summary:
      "Rubber farmers in Thailand’s south are counting the cost of extreme weather in the world’s top growing region.",
    image: "/images/supplier-news-1.png",
  },
  {
    id: 2,
    date: "26 Jan 2023",
    title: "AR head-up display (AR-HUD), what’s up ahead?",
    tags: ["AR-HUD", "innovation"],
    summary:
      "The global AR HUD market was valued at USD 2.14 Billion in 2020 and is projected to reach USD 13.97 Billion by 2028, growing at a CAGR of 26.43%% from 2021 to 2028.",
    image: "/images/supplier-news-2.png",
  },
  {
    id: 3,
    date: "25 Jan 2023",
    title: "Japan HA develops e-axles for OEM",
    tags: ["ev", "chassis", "eaxle"],
    summary:
      "The e-axle on the powertrains unit will all be manufactured at HA’s base in H-shi, I Prefecture",
    image: "/images/supplier-news-3.png",
  },
  {
    id: 4,
    date: "01 Feb 2023",
    title:
      "SCaaS: innovative Supply Bridge, bringing Intelligent Digitalization into Supply Chain",
    tags: [
      "supplychain",
      "digitalisation",
      "sustainability",
      "scouting",
      "smartbridgeAI",
    ],
    summary:
      "With in-depth industry expertise and advanced intelligent tools, Supply Bridge is solving the industry pain points",
    image: "/images/supplier-news-4.png",
  },
];

const prepareDummyData = (offset: number, limit: number) => {
  let dummyData = [];
  for (let id = 1; id < limit + 1; id++) {
    const newId = offset + id;
    dummyData.push({ ...dummySample[id - 1], id: newId });
  }

  return {
    supplyerNews: dummyData,
    count: Math.min(4, dummyData.length + offset + 1),
  };
};

export const getNewsData = async (name: string) => {
  try {
    const { data } = await cdsRequest.get(
      `data/news?name=${encodeURIComponent(name)}`
    );
    return data || [];
  } catch (err: any) {
    console.error(err);
    return [];
  }
};

export const getNewsRelevancyData = async (
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

export const useSupplierNews = (): any => {
  const [loading, setLoading] = useState(false);
  const supplierNews = useBoundStore((state) => state.supplierNews);
  const { page, pageSize, setCount, setNews } = supplierNews;

  const getSupplierNews = async (
    typeI: number = 0,
    currentPage: number = page,
    didCancel?: boolean
  ) => {
    try {
      if (loading) return;
      console.log("getSupplierNews - called");
      setLoading(true);
      const searchParam = {
        offest: (currentPage - 1) * pageSize,
        limit: pageSize,
      };

      let rs: INewsRelevancyModelWithNews[] = [];
      switch (typeI) {
        case 0:
          rs = await getNewsRelevancyData(EnumNewsCategory.INDUSTRY);
          break;
        case 1:
          rs = await getNewsRelevancyData(EnumNewsCategory.SUPPLIER);
          break;
        case 2:
          rs = await getNewsRelevancyData(EnumNewsCategory.RISK);
          break;
      }

      if (!didCancel) {
        const response = {
          count: rs ? rs.length || 0 : 0,
          news: rs,
        };
        // Update state
        setNews(response.news);
        setCount(response.count);
        setLoading(false);
        return response;
      }
    } catch (err: any) {
      if (!didCancel) {
        setLoading(false);
      }
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return { getSupplierNews, loading };
};
