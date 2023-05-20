import { useEffect, useState } from "react";
import useStore from "hooks/useStore";
import {
   NullableImg,
   SummaryContainer,
   SummaryCategoryIcon,
   SummaryTitleColumn,
   SummaryTitle,
   SummaryColumn,
   SummarySpaceColumn,
   SummaryLabel,
   SummaryTopList,
   SummaryTopListOne,
   SummarySupplierContainer,
   SummarySupplierTitle,
   SummaryCategoriesContainer,
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

function selectNearestL2(L2: string[], q: string) {
   const L2lowercases = L2.map((x: string) => x.toLowerCase());
   const i = L2lowercases.indexOf(q.toLowerCase());
   if (i < 0) return null;
   return L2[i];
}

function determineSummary(filterData: any, suppliers: any) {
   const summary: any = {};
   // TODO: determine summary title by filterData.q
   summary.lastQ = filterData.q;
   const L2 = Object.keys(demoData.L2L3);
   summary.title = selectNearestL2(L2, summary.lastQ);
   summary.L2selected = summary.title;
   if (summary.title) {
      summary.categories = demoData.L2L3[summary.title];
   } else {
      summary.title = summary.lastQ;
      summary.categories = null;
   }
   // TODO: rank suppliers by revenue; currently pick the first 10
   const selectedSuppliers = suppliers.slice(0, 9);
   summary.suppliersA = selectedSuppliers.slice(0, 3);
   summary.suppliersB = selectedSuppliers.slice(3, 6);
   summary.suppliersC = selectedSuppliers.slice(6, 9);
   return summary;
}

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

const SummaryCategories = (props: any) => {
   const { L2, L2selected, L3, L3Selected } = props;
   if (!L2?.length) return null;
   return (
      <SummaryCategoriesContainer>
         <div className="cat-L2-list">
            { L2.map((name: string, i: number) => <span className={`cat-L2 ${name === L2selected?'active':''}`} key={i}>{name}</span>) }
            <span className="cat-L2 cat-L2-more">More Categories</span>
         </div>
         { (!L3?.length) ? null : (<>
            <div className="cat-L3-title">Categories</div>
            <div className="cat-L3-list">
               { L3.map((name: string, i: number) => <span className="cat-L3" key={i}>{name}</span>) }
            </div>
         </>)
         }
      </SummaryCategoriesContainer>
   );
   // TODO: L3 -> object (innovation -> icon) displayed before L3 name
}

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
  }, [suppliers]);

  return (
     <>
     <SummaryContainer><div>
        <SummaryColumn><SummaryCategoryIcon /></SummaryColumn>
        <SummaryTitleColumn>
           <SummaryLabel>Suggest for you ...</SummaryLabel>
           <SummaryTitle>{summary.title}</SummaryTitle>
        </SummaryTitleColumn>
        <SummarySpaceColumn space={70}>
        {
           summary?.categories ? (<><SummaryLabel>Top Suppliers</SummaryLabel>
           <SummaryTopList>
              <SummaryTopListOne>
                 <Suppliers data={summary.suppliersA}/>
              </SummaryTopListOne>
              <SummaryTopListOne>
                 <Suppliers data={summary.suppliersB}/>
              </SummaryTopListOne>
              <SummaryTopListOne>
                 <Suppliers data={summary.suppliersC}/>
              </SummaryTopListOne>
           </SummaryTopList></>) : null
        }
        </SummarySpaceColumn>
     </div></SummaryContainer>
     <SummaryCategories
        L2={Object.keys(demoData.L2L3)} L2selected={summary.L2selected}
        L3={summary?.categories} L3selected={''}
     />
     </>
  );
}
