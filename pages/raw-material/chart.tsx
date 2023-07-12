import { useEffect, useRef, useState } from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import LoadingAnimation from "components/LoadingAnimation";
import * as echarts from "echarts";
import { Card } from "@mui/material";
import Head from "next/head";

interface IChartData {
  data: number[];
}

const CommodityChart = ({ data }: IChartData) => {
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current) {
      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data,
            type: "line",
          },
        ],
      };
      const myChart = echarts.init(chartRef.current);
      myChart.setOption(option);
    }
  }, [chartRef, data]);

  return (
    // <Card
    //   style={{
    //     borderRadius: 16,
    //     boxShadow: "None",
    //     height: "100%",
    //     width: 600,
    //   }}
    // >
    <div ref={chartRef} />
    // </Card>
  );
};

const MyChart = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [materialList, setMaterialList] = useState<string[]>([]);
  const materials = router.query.materials as string;

  const fetchData = async () => {
    try {
      const resp = await fetch("/api/fakeData");
      console.log(await resp.json());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (
        materials !== undefined &&
        materials !== "" &&
        materials.split(",").length > 0
      ) {
        setMaterialList(materials.split(","));
        fetchData();
      } else {
        // no query string, go back to raw-material page
        router.replace("/raw-material");
      }
    }
  }, [materials, router]);

  return (
    <Layout>
      <Head>
        <title>Market Data | Supply Bridge</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && (
        <div
          style={{
            display: "flex",
            height: "400px",
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <LoadingAnimation />
        </div>
      )}
      {!loading && (
        <CommodityChart data={[150, 230, 224, 218, 135, 147, 260]} />
      )}
    </Layout>
  );
};

export default MyChart;
