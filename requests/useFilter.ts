import { toast } from "react-toastify";

import { request } from 'config/axios';
import useStore from 'hooks/useStore';

export const useFilter = () => {
  const { setCommodities, setRegions, setParts, setSubRegions } = useStore();

  const getCommodities = async () => {
    try {
      const { data } = await request.get("scout/commodities");
      setCommodities(data?.commodities);
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getParts = async (commodityIds: number[]) => {
    try {
      if (commodityIds.length) {
        const { data } = await request.post("scout/parts", {commodities: commodityIds});
        setParts(data?.parts);
      } else {
        setParts([])
      }
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getRegions = async () => {
    try {
      const { data } = await request.get("scout/regions");
      setRegions(data.regions);
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getSubRegions = async (regionIds: number[]) => {
    try {
      if (regionIds.length) {
        const { data } = await request.post("scout/subregions", {regions: regionIds});
        setSubRegions(data.subRegions);
      } else {
        setSubRegions([]);
      }
      
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return { getCommodities, getParts, getRegions, getSubRegions };
};
