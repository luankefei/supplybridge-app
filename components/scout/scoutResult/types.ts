import type { GridPaginationModel } from "@mui/x-data-grid";

import { TSupplierModel } from "models/supplier";

export enum EnumSearchType {
  Keywords = "Keywords",
  Companies = "Companies",
}

export interface IPageMeta {
  stats: {
    count: number
    [x: string]: any
  }
  page: number
  pageSize: number
}

export interface IScountResultControl {
  reset: () => void
}

export interface IScoutResultProps {
  suppliers: TSupplierModel[]
  searchType?: EnumSearchType
  pageMeta: IPageMeta
  queryString: string
  selectedCountry?: string
  onSearch: (_param: GridPaginationModel) => void
  onViewDetail: (_sid: number) => void
  onShowSimilarCompanies?: (_company: string) => void
}
