import styled from "styled-components";

export const SummaryContainer = styled.div`
   width: 100%;
   margin: 30px 0 10px 0;
   > div {
      border-radius: 10px;
      background-color: white;
      margin: 0 20px;
      padding-right: 20px;
      display: flex;
   }
`;

export const SummaryCategoryIcon = styled.img`
   width: 80px;
   height: 80px;
   border: 1px solid #ddd;
   border-radius: 8px;
`;

export const SummaryTitleColumn = styled.div`
   padding: 10px;
   flex: 1 0 auto;
`;

export const SummaryTitle = styled.div`
   font-size: 30px;
   color: #08979c;
   font-weight: bold;
   margin-top: 5px;
`;

export const SummaryColumn = styled.div`
   padding: 10px;
`;
export const SummarySpaceColumn = styled.div<{space: number}>`
   padding: 10px;
   width: ${(props: any) => `${props.space}%`};
`;

export const SummaryLabel = styled.div`
   font-size: 12px;
   color: #ccc;
`;

export const SummaryCategoryListContainer = styled.div``;

export const SummaryCategoryList = styled.ul`
   list-style: none;
   padding: 0;
   margin: 2px 0;
`;

export const SummaryCategoryItem = styled.li`
   width: 100%;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow-x: hidden;
`;

export const SummaryTop10List = styled.div`
   width: 100%;
   display: flex;
`;

export const SummaryTop10ListHalf = styled.div`
   width: 50%;
   margin-left: 5px;
`;

export const SummarySupplierContainer = styled.div`
   display: flex;
   > img {
      border-radius: 50%;
      width: 24px;
      height: 24px;
   }
`;

export const SummarySupplierTitle = styled.div`
   width: calc(100% - 24px);
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
`;
