import { useState } from "react";
import { toast } from "react-toastify";

import { request } from "config/axios";

import useBoundStore from "hooks/useBoundStore";

export const useQuickBridgeSupplier = () => {
  const [loading, setLoading] = useState(false);

  const quickBridge = useBoundStore((state) => state.quickBridge);
  const { page, pageSize, setCount, setSuppliers, filter, q } = quickBridge;


  const searchSuppliers = async (
    pageNumber: number = page,
    reset = true,
    searchString?: string
  ) => {
    try {

      setLoading(true);
      const searchObj = {
        q: q || searchString,
        offset: ((pageNumber - 1) * pageSize),
        limit: pageSize,
        filter: {
          ...filter,
        },
      };

      console.log("quickbridge suppliers searching for", searchObj)
      const { data } = await request.post(
        `suppliers/search_full_text`,
        searchObj
      );
      console.log("quick bridge result", data)
      setLoading(false);
      setSuppliers(data?.suppliers, reset);
      setCount(data.count);
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return { searchSuppliers, loading };
};
