import { useEffect, useState } from "react";
import useStore from "hooks/useStore";
import {
   SummaryContainer,
   SummaryCategoryIcon,
   SummaryTitleColumn,
   SummaryTitle,
   SummaryColumn,
   SummarySpaceColumn,
   SummaryLabel,
   SummaryCategoryListContainer,
   SummaryCategoryList,
   SummaryCategoryItem,
   SummaryTop10List,
   SummaryTop10ListHalf,
   SummarySupplierContainer,
   SummarySupplierTitle,
} from "components/scout/Summary.styled";

import demoData from "components/scout/summaryCategoryData";

function demoRandomPick(obj: any): any {
   if (!obj) return null;
   if (Array.isArray(obj)) {
      if (!obj.length) return null;
      return obj[Math.floor(Math.random() * obj.length)];
   } else {
      return demoRandomPick(Object.keys(obj));
   }
}

function determineSummary(filterData: any, suppliers: any) {
   const summary: any = {};
   // TODO: determine summary title by filterData.q
   summary.title = demoRandomPick(demoData.L2L3);
   summary.categories = demoData.L2L3[summary.title];
   summary.lastQ = filterData.q;
   // TODO: rank suppliers by revenue; currently pick the first 10
   const selectedSuppliers = suppliers.slice(0, 10);
   const selectedN = Math.floor(selectedSuppliers.length/2);
   summary.suppliersA = selectedSuppliers.slice(0, selectedN);
   summary.suppliersB = selectedSuppliers.slice(selectedN);
   return summary;
}

const NullableImg = (props: any) => {
   const { url } = props;
   return url ? <img src={url} /> : null ;
};

const Supplier = (props: any) => {
   return (
      <SummarySupplierContainer>
         <NullableImg url={props.logo} />
         <SummarySupplierTitle>{props.name}</SummarySupplierTitle>
      </SummarySupplierContainer>
   );
};

const Suppliers = (props: any) => {
   return props.data?.map(
      (z: any, i: number) => <Supplier key={i} logo={z.logo} name={z.longName || z.name} />
   );
};

export default function Summary() {
  const {
    suppliers,
    page,
    setPage,
    count,
    setFilterData,
    filterData,
    clearFilterData,
    vehicleFuelTypes,
  } = useStore();

  const [summary, setSummary] = useState(determineSummary(filterData, suppliers) || {});
  useEffect(() => {
     if (filterData.q === summary.lastQ) return;
     setSummary(determineSummary(filterData, suppliers));
  }, [filterData]);

  return (
     <SummaryContainer><div>
        <SummaryColumn><SummaryCategoryIcon /></SummaryColumn>
        <SummaryTitleColumn>
           <SummaryLabel>Suggest for you ...</SummaryLabel>
           <SummaryTitle>{summary.title}</SummaryTitle>
        </SummaryTitleColumn>
        <SummarySpaceColumn space={20}>
           <SummaryLabel>Categories</SummaryLabel>
           <SummaryCategoryListContainer><SummaryCategoryList>
              {summary.categories?.map(
                 (z: string, i: number) => (<SummaryCategoryItem key={i}><a title={z}>{z}</a></SummaryCategoryItem>)
              )}
           </SummaryCategoryList></SummaryCategoryListContainer>
        </SummarySpaceColumn>
        <SummarySpaceColumn space={30}>
           <SummaryLabel>Top 10 Suppliers</SummaryLabel>
           <SummaryTop10List>
              <SummaryTop10ListHalf>
                 <Suppliers data={summary.suppliersA}/>
              </SummaryTop10ListHalf>
              <SummaryTop10ListHalf>
                 <Suppliers data={summary.suppliersB}/>
              </SummaryTop10ListHalf>
           </SummaryTop10List>
        </SummarySpaceColumn>
     </div></SummaryContainer>
  );
}
