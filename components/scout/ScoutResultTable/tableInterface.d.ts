type Order = "asc" | "desc";

interface ITableData {
  logo: string;
  name: string;
  longName: string;
  headquarter: any;
  footprint: string[];
  isInnovation: boolean;
  isBlur: boolean;
  category: string[];
  flags: any;
  meta: Record<string, any>;
}

interface ITableHeadCell {
  disablePadding?: boolean;
  id: keyof ITableData;
  label: string;
  sortable?: boolean;
  numeric?: boolean;
}
