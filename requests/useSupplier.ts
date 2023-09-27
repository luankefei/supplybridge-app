import { useState } from "react";
import { toast } from "react-toastify";

import { request } from "config/axios";
import { useStore } from "hooks/useStore";
import fakeData from "requests/hotpatchSearchDemoData";
import { useTranslation } from "react-i18next";
import { appStatus } from "hooks/appStatus";

interface IAdditionalSearchObj {
  page: number;
  pageSize: number;
}
interface IUseSupplierReturned {
  querySupplierListByKeyword: (
    queryString: string,
    { page, pageSize }: IAdditionalSearchObj
  ) => Promise<void>;
  searchAutocomplete: (queryString: string) => Promise<string[]>;
  loading: boolean;
  querySupplieListByCompany: (
    queryString: string,
    { page, pageSize }: IAdditionalSearchObj
  ) => Promise<void>;
}

export const useSupplier = (): IUseSupplierReturned => {
  const { setSuppliers, setCount, setStats } = useStore();
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
  const querySupplierListByKeyword = async (
    queryString: string,
    { page, pageSize }: IAdditionalSearchObj
  ) => {
    const searchObj = {
      q: queryString,
      offset: page * pageSize,
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
  const querySupplieListByCompany = async (
    queryString: string,
    { page, pageSize }: IAdditionalSearchObj
  ) => {
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

  return {
    querySupplierListByKeyword,
    querySupplieListByCompany,
    loading,
    searchAutocomplete,
  };
};
