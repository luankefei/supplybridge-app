import { useState } from "react";
import { toast } from "react-toastify";

import { request } from "config/axios";
import useStore from "hooks/useStore";

export const useSupplier = () => {
  const { setSuppliers, page, pageSize, setPage, setCount, setShowBackdrop, setStats } =
    useStore();
  const [loading, setLoading] = useState(false);

  const searchSuppliers = async (
    pageNumber: number = page,
    reset = true,
    searchString?: string
  ) => {
    try {
      const { filterData } = useStore.getState();
      if (filterData.q != "" || filterData.regions.length > 0 || filterData.subRegions > 0) {
        setLoading(true);
        const searchObj = {
          q: filterData.q || searchString,
          offset: ((pageNumber - 1) * pageSize),
          limit: pageSize,
          filter: {
            ...filterData,
          },
        };

      const { data } = await request.post(
        `suppliers/search_full_text`,
        searchObj
      );
      setLoading(false);
      setSuppliers(data?.suppliers, reset);
      setCount(data?.count);
      setStats(data?.stats)
      setShowBackdrop(data?.suppliers.length===0)
      }
    } catch (err: any) {
      console.log(err)
      setLoading(false);
      toast.error(err.response?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return { searchSuppliers, loading };
};
