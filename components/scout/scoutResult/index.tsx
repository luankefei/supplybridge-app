import React, { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

import { usePersistentStore } from "hooks/useStore";
import { hasIntersection, isArraysOverlapped } from "utils/array";
import { TwoLetterCodeToCountryCodeMap } from "components/geoChart/geoIdMap";

import { ViewType } from "../scoutByIndex/actionFilterAndView";
import { FilterDataset, FilterValue, helperTableDataToFilterDataset } from "./actionFilterAndView/tableFilters";

import { ITableData, supplierModelToTableData } from "./resultTable/helper";
import ActionFilterAndView from "./actionFilterAndView";
import ShortListModal from "./shortlistModal";
import ResultTable from "./resultTable";
import { IScountResultControl, IScoutResultProps } from "./types";

export const ScoutResult = forwardRef<IScountResultControl, IScoutResultProps>(({
  suppliers,
  searchType,
  pageMeta,
  queryString,
  selectedCountry,
  onSearch,
  onShowSimilarCompanies,
}, ref) => {
  const router = useRouter();
  const { allSubRegions } = usePersistentStore();

  const [viewType, setView] = useState<ViewType>(ViewType.LIST);
  const [initialFilterDataset, setinitialFilterValue] = useState<FilterDataset>(
    {
      names: new Set(),
      headquarters: new Set(),
      regions: new Set(),
      globalFootprints: new Set(),
      badges: new Set(),
    }
  );
  const [data, setData] = useState<ITableData[]>([]);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [filterValue, setFilterValue] = useState<FilterValue>();
  const [shortListModalOpen, setShortListModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setData([]);
      setTableData([]);
    }
  }), [])

  useEffect(() => {
    const initialData: ITableData[] = suppliers?.map((s: any, i: number) =>
      supplierModelToTableData(s, i, allSubRegions)
    );

    const initialFilterData: FilterDataset =
      helperTableDataToFilterDataset(initialData);
    setinitialFilterValue(initialFilterData);

    setData(initialData);
    setTableData(initialData);
  }, [suppliers, allSubRegions]);

  /********************
   * Component Functions
   *********************/
  const reCalTableData = useCallback((fv?: FilterValue, sc?: string) => {
    let fvFilter = (s: any) => true;
    if (fv !== undefined) {
      const { names, headquarters, regions, globalFootprints, badges } = fv;
      fvFilter = (s: any) => {
        const { name, headquarter, globalFootprint, globalFootprintRegion, badges: sbadges } = s;
        return (
          (names.length === 0 || names.includes(name)) &&
          (headquarters.length === 0 || headquarters.includes(headquarter)) &&
          (regions.length === 0 || isArraysOverlapped(regions, globalFootprintRegion)) &&
          (globalFootprints.length === 0 ||
            hasIntersection(globalFootprint, globalFootprints)) &&
          (badges.length === 0 || badges.some((b) => sbadges.includes(b)))
        );
      };
    }
    let scFilter = (s: any) => true;
    if (sc !== undefined) {
      scFilter = (s: any) => {
        const { globalFootprintIds } = s;
        const found = globalFootprintIds.find((gfi: number) => {
          const twoLC = allSubRegions[gfi]?.code;
          const threeLC = TwoLetterCodeToCountryCodeMap[twoLC];
          return threeLC === selectedCountry;
        });
        return found;
      };
    }
    const newData = data.filter(fvFilter).filter(scFilter);
    setTableData(newData);
  }, [allSubRegions, data, selectedCountry]);

  const onFilterChange = useCallback((fv: FilterValue) => {
    setFilterValue(fv);
    reCalTableData(fv, selectedCountry);
  }, [selectedCountry, reCalTableData]);

  const onRowSelect = useCallback((rows: number[]) => {
    if (rows.length > 3) {
      toast.error("You can only select up to 3 companies.");
      return;
    }
    setSelectedRows(rows);
  }, [])

  const onCompare = useCallback(() => {
    if (selectedRows.length) {
      router.push({
        pathname: "/scout/compare",
        query: {
          suppliers: selectedRows.join(","),
        },
      });
    }
  }, [router, selectedRows]);

  const onSendNDA = useCallback(() => {
    if (selectedRows.length) {
      console.log("TODO: Send NDA");
    }
  }, [selectedRows.length]);

  const onSendRFI = useCallback(() => {
    if (selectedRows.length) {
      console.log("TODO: Send FRI");
    }
  }, [selectedRows.length]);

  useEffect(() => {
    if (data.length === 0) return;
    reCalTableData(filterValue, selectedCountry);
  }, [data, filterValue, selectedCountry, reCalTableData]);
  
  return (
    <>
    <Box sx={{ p: 3 }}>
      <ActionFilterAndView
        filterInitialData={initialFilterDataset}
        resultCount={pageMeta.stats.count || 0}
        displayCount={pageMeta.stats.count}
        resultType={queryString || ""}
        onClickBuildMyShortList={() => {
          setShortListModalOpen(true);
        }}
        onClickBidderList={() => {
          console.log("onClickBidderList");
        }}
        onFilterChange={onFilterChange}
        view={viewType}
        onViewChange={setView}
        onClickCompare={onCompare}
        onClickSendNDA={onSendNDA}
        onClickSendRFI={onSendRFI}
      />
      <ResultTable
        viewType={viewType}
        totalResults={pageMeta.stats.count || 0}
        paginationModel={{
          page: pageMeta.page,
          pageSize: pageMeta.pageSize,
        }}
        onPaginationModelChange={onSearch}
        searchType={searchType}
        tableData={tableData}
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        onShowSimilarCompanies={onShowSimilarCompanies}
      />
    </Box>
    <ShortListModal
      open={shortListModalOpen}
      onClose={(tags?: string[]) => {
        console.log("tags", tags);
        setShortListModalOpen(false);
      }}
    />
    </>
  );
});

export default ScoutResult
export type TScountResult = React.ElementRef<typeof ScoutResult> | null

ScoutResult.displayName = 'ScoutResult';
