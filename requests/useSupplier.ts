import { useState, useRef } from 'react';
import { toast } from "react-toastify";

import { request } from 'config/axios';
import useStore from 'hooks/useStore';

export const useSupplier = () => {
  const { setSuppliers, filterData, page, pageSize, setPage, setCount } = useStore();
  const [loading, setLoading] = useState(false);

  const searchSuppliers = async (pageNumber: number = page) => {
    try {
      setLoading(true)
      const { data } = await request.post(`supplier/search?page=${pageNumber}&pageSize=${pageSize}`, filterData);
      setLoading(false)
      if (data?.success) {
        setSuppliers(data?.suppliers);
        setCount(data.count)
        const newPage = pageNumber + 1;
        setPage(newPage);
      }
      
    } catch (err: any) {
      setLoading(false)
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return { searchSuppliers, loading };
};
