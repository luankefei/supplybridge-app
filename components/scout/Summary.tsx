import { useEffect, useState, useRef } from "react";
import useStore from "hooks/useStore";
import {
   SummaryContainer,
   SummaryCategoryIcon,
   SummaryTitleColumn,
   SummaryTitle,
   SummaryColumn,
   SummaryLabel,
   SummarySubCategoryListContainer,
   SummarySubCategoryList,
   SummarySubCategoryItem,
   SummaryTop10List,
   SummaryTop10ListHalf,
} from "components/scout/Summary.styled";

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

  return (
     <SummaryContainer><div>
        <SummaryColumn><SummaryCategoryIcon /></SummaryColumn>
        <SummaryTitleColumn>
           <SummaryLabel>You are searching for ...</SummaryLabel>
           <SummaryTitle>Wheel</SummaryTitle>
        </SummaryTitleColumn>
        <SummaryColumn>
           <SummaryLabel>Categories</SummaryLabel><SummarySubCategoryList>
              <SummarySubCategoryItem>a</SummarySubCategoryItem>
              <SummarySubCategoryItem>b</SummarySubCategoryItem>
              <SummarySubCategoryItem>c</SummarySubCategoryItem>
           </SummarySubCategoryList><SummarySubCategoryListContainer>
           </SummarySubCategoryListContainer>
        </SummaryColumn>
        <SummaryColumn>
           <SummaryLabel>Top 10 Suppliers</SummaryLabel>
           <SummaryTop10List>
              <SummaryTop10ListHalf>a</SummaryTop10ListHalf>
              <SummaryTop10ListHalf>b</SummaryTop10ListHalf>
           </SummaryTop10List>
        </SummaryColumn>
     </div></SummaryContainer>
  );
}
