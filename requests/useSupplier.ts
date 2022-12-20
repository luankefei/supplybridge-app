import { useState } from "react";
import { toast } from "react-toastify";

import { request } from "config/axios";
import useStore from "hooks/useStore";

export const useSupplier = () => {
  const { setSuppliers, filterData, page, pageSize, setPage, setCount } =
    useStore();
  const [loading, setLoading] = useState(false);

  const searchSuppliers = async (pageNumber: number = page, reset = true) => {
    try {
      setLoading(true);
      const searchObj = {
        q: filterData.q,
        offset: pageNumber,
        limit: pageSize,
        filter: {
          ...filterData,
        },
      };
      delete searchObj.filter.q;
      
      const { data } = await request.post(
        `supplier/full-text-search`,
        searchObj
      );
      setLoading(false);
      if (data?.success) {
        setSuppliers(data?.suppliers, reset);
        setCount(data.count);
        const newPage = pageNumber + 1;
        setPage(newPage);
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return { searchSuppliers, loading };
};
