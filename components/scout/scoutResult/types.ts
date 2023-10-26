import type { GridPaginationModel } from "@mui/x-data-grid";

import { ITableData } from "../scoutByIndex/scoutResultTable/helper";

export enum EnumSearchType {
  Keywords = "Keywords",
  Companies = "Companies",
}

export interface IScoutResultProps {
  data: ITableData[]
  searchType?: EnumSearchType
  selectedRows: number[]
  onRowSelect: (_rows: number[]) => void
  onSearch: (_param: GridPaginationModel) => void
  onShowSimilarCompanies?: (_company: string) => void
}
