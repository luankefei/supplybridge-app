import { useState } from "react";
import { toast } from "react-toastify";

import { request } from "config/axios";
import { useStore } from "hooks/useStore";
import fakeData from "requests/hotpatchSearchDemoData";
import { useTranslation } from "react-i18next";
import { appStatus } from "hooks/appStatus";

interface IUseSupplierReturned {
  querySupplierListByKeyword: (queryString: string) => Promise<void>;
  searchAutocomplete: (queryString: string) => Promise<string[]>;
  loading: boolean;
  querySupplieListByCompany: (queryString: string) => Promise<void>;
  searchSuppliers: (
    pageNumber: number,
    reset: boolean,
    searchString: string
  ) => Promise<void>;
}

export const useSupplier = (): IUseSupplierReturned => {
  const { setSuppliers, setCount, setStats, page, pageSize } = useStore();
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
        `configData/categorylevel?a=${encodeURIComponent(q)}&l=${
          i18n.languages[0]
        }`
      );
      return data.items || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  /**
   * Query supplier list by keyword string
   *
   * sets [suppliers], [count], [stats] at store
   *
   * sets loading
   * @param queryString -- search string
   * @returns the data from the request
   */
  const querySupplierListByKeyword = async (queryString: string) => {
    const searchObj = {
      q: queryString,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      filter: {
        _extras: {
          // This is not hardcoded into the backend, just need a different
          // value for `type`
          type: "Keywords",
          lang: i18n.languages[0],
        },
      },
    };
    await _querySupplierList(searchObj);
  };

  /**
   * Query supplier list by company name
   *
   * sets [suppliers], [count], [stats] at store
   *
   * sets loading
   * @param queryString -- search string
   * @returns the data from the request
   */
  const querySupplieListByCompany = async (queryString: string) => {
    const searchObj = {
      q: queryString,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      filter: {
        _extra: {
          // This is hardcoded into the backend, so we need to send it
          // supplybridge-backend @ src/services/localSearch.ts
          // if (filter?._extra?.type === 'Companies') {
          type: "Companies",
          lang: i18n.languages[0],
        },
      },
    };
    await _querySupplierList(searchObj);
  };

  const _querySupplierList = async (searchObj: object) => {
    try {
      setLoading(true);
      const endpoint = "suppliers/search_full_text";
      await appStatus.ready("getAllSubRegions");
      const { data } = await request.post(endpoint, searchObj);
      await fakeData(data, searchObj);
      setLoading(false);

      if (data.suppliers[0]?.id === undefined) {
        // supplier id is missing, somethings this happens,
        // right now use idx on frontend as a hack,
        // TODO: Fix this, return id from backend
        data.suppliers = data.suppliers.map((supplier: any, idx: number) => {
          supplier.id = idx;
          return supplier;
        });
      }

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
    querySupplierListByKeyword,
    querySupplieListByCompany,
    searchSuppliers,
    loading,
    searchAutocomplete,
  };
};
