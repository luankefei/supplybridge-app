import { useEffect, useRef, useState } from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import LoadingAnimation from "components/LoadingAnimation";
import * as echarts from "echarts";

interface IChartData {
  data: number[];
}

const CommodityChart = ({ data }: IChartData) => {
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
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.setOption(option);
    }
  }, [chartRef]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }}></div>;
};

const MyChart = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [materialList, setMaterialList] = useState<string[]>([]);
  const materials = router.query.materials as string;

  useEffect(() => {
    if (router.isReady) {
      if (
        materials !== undefined &&
        materials !== "" &&
        materials.split(",").length > 0
      ) {
        setMaterialList(materials.split(","));
      } else {
        // no query string, go back to raw-material page
        router.replace("/raw-material");
      }
    }
  }, [materials, router]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Layout>
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
