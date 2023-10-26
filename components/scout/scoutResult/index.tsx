import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

import { useStore } from "hooks/useStore";
import { ViewType } from "../scoutByIndex/actionFilterAndView";
import ResultTable from "./resultTable";
import { IScoutResultProps } from "./types";

export const ScoutResult: React.FC<IScoutResultProps> = ({
  data,
  searchType,
  selectedRows,
  onRowSelect,
  onSearch,
  onShowSimilarCompanies
}) => {
  const { t } = useTranslation();
  const {
    queryString,
    suppliers,
    stats,
    page,
    pageSize,
    setQueryString,
    setSuppliers,
    setStats,
    setPage,
    setPageSize,
  } = useStore();

  const [viewType, setView] = useState<ViewType>(ViewType.LIST);

  return (
    <Box sx={{ p: 3 }}>
      <ResultTable
        viewType={viewType}
        totalResults={stats.count || 0}
        paginationModel={{
          page,
          pageSize,
        }}
        onPaginationModelChange={onSearch}
        searchType={searchType}
        tableData={data}
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        onShowSimilarCompanies={onShowSimilarCompanies}
      />
    </Box>
  );
}

export default ScoutResult
