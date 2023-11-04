import { toast } from "react-toastify";

import { request } from "config/axios";
import { usePersistentStore, useStore } from "hooks/useStore";
import { appStatus } from "hooks/appStatus";

export const useFilter = () => {
  const {
    setCommodities,
    setRegions,
    setComponents,
    setSubRegions,
    setMapRegions,
  } = useStore();
  const { setAllSubRegions } = usePersistentStore();

  const getCommodities = async () => {
    try {
      const { data } = await request.get("commodities");
      setCommodities(data?.commodities);
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getComponents = async (commodityIds: number[]) => {
    try {
      if (commodityIds.length) {
        const { data } = await request.get(
          `components?commodities=${commodityIds.toString()}`
        );
        setComponents(data?.components);
      } else {
        setComponents([]);
      }
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getRegions = async () => {
    try {
      const { data } = await request.get("regions");
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
        const { data } = await request.get(
          `sub_regions?regions=${regionIds.toString()}`
        );
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
  const getAllSubRegions = async () => {
    try {
      const promise = request.get(`sub_regions`);
      appStatus.addPromise("getAllSubRegions", promise);

      const { data } = await promise;
      setAllSubRegions(data.subRegions);
      return data.subRegions;
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return null;
    }
  };

  const getMapRegions = async () => {
    try {
      const { data } = await request.get(`sub_regions`);
      setMapRegions(data.subRegions);
      return data.subRegions;
    } catch (err: any) {
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return null;
    }
  };

  return {
    getCommodities,
    getComponents,
    getRegions,
    getSubRegions,
    getAllSubRegions,
    getMapRegions,
  };
};
