import { useState } from "react";
import { toast } from "react-toastify";

import { request } from "config/axios";
import { useNonPersistentStore, usePersistentStore } from "hooks/useStore";
import fakeData from "requests/hotpatchSearchDemoData";
import { useTranslation } from "react-i18next";

export const useSupplier = (flags: any = null) => {
  const { setSuppliers, setCount, setStats } = useNonPersistentStore();
  const { page, pageSize } = usePersistentStore();
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();

  /**
   * Search for autocomplete suggestions based on a query string
   * @param q - search string
   * @returns an array of autocomplete suggestions, or an empty array
   */
  const searchAutocomplete = async (q: string) => {
    if (!q || q.length < 2) return [];
    try {
      const { data } = await request.get(
        `configData/categorylevel?a=${encodeURIComponent(q)}&l=${i18n.language}`
      );
      return data.items || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  /**
   * Query supplier list by string
   *
   * sets [suppliers], [count], [stats] at store
   *
   * sets loading
   * @param queryString -- search string
   * @returns the data from the request
   */
  const querySupplierListByName = async (queryString: string) => {
    try {
      setLoading(true);
      const searchObj = {
        q: queryString,
        offset: (page - 1) * pageSize,
        limit: pageSize,
      };
      const endpoint = "suppliers/search_full_text";
      const { data } = await request.post(endpoint, searchObj);
      await fakeData(data, searchObj);
      setLoading(false);
      setSuppliers(data?.suppliers, true);
      setCount(data?.count);
      setStats(data?.stats);
      return data;
    } catch (err: any) {
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const searchSuppliers = async (
    pageNumber: number = page,
    reset = true,
    searchString?: string
  ) => {
    try {
      const { flags, filterData } = usePersistentStore.getState();
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
      }
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      toast.error(err.response?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return {
    querySupplierListByName,
    searchSuppliers,
    loading,
    searchAutocomplete,
  };
};
