import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { request } from "config/axios";
import useStore from "hooks/useStore";
import fakeData from "requests/hotpatchSearchDemoData";

export const useSupplier = (flags: any = null) => {
  const {
    setSuppliers,
    page,
    pageSize,
    setPage,
    setCount,
    setShowBackdrop,
    setStats,
  } = useStore();
  const [loading, setLoading] = useState(false);

  const searchAutocomplete = async (q: string, lang: "en" | "de") => {
    if (!q || q.length < 2) return [];
    try {
      const { data } = await request.get(
        `configData/categorylevel?a=${encodeURIComponent(q)}&l=${lang || "en"}`
      );
      return data.items || [];
    } catch (err: any) {
      console.error(err);
      return [];
    }
  };

  const searchSuppliers = useCallback(
    async (pageNumber: number = page, reset = true, searchString?: string) => {
      try {
        const { flags, filterData } = useStore.getState();
        if (
          filterData.q ||
          filterData.regions.length > 0 ||
          filterData.subRegions > 0
        ) {
          setLoading(true);
          const searchObj = {
            q: filterData.q || searchString,
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
            filter: {
              _extra: flags,
              ...filterData,
            },
          };

          const entrypoint =
            !flags.type || flags.type === "Keywords"
              ? "suppliers/search_full_text"
              : "suppliers/search_full_text";
          const { data } = await request.post(entrypoint, searchObj);
          await fakeData(data, searchObj);
          setLoading(false);
          setSuppliers(data?.suppliers, reset);
          setCount(data?.count);
          setStats(data?.stats);
          setShowBackdrop(data?.suppliers.length === 0);
        }
      } catch (err: any) {
        console.log(err);
        setLoading(false);
        toast.error(err.response?.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    [
      page,
      pageSize,
      setLoading,
      setSuppliers,
      setCount,
      setStats,
      setShowBackdrop,
    ]
  );

  return { searchSuppliers, loading, searchAutocomplete };
};
