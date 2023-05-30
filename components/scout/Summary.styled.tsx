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

export const SummaryL3Title = styled.div`
   font-size: 25px;
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

export const SummaryTopList = styled.div`
   width: 100%;
   display: flex;
   align-content: space-between;
   flex-wrap: wrap;
`;

export const SummaryTopListOne = styled.div`
   margin-left: 5px;
`;

export const SummarySupplierContainer = styled.div`
   display: flex;
`;

export const SummarySupplierTitle = styled.div`
   width: calc(100% - 24px);
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
`;

const NullabeImgContainer = styled.div<any>`
   margin-right: 5px;
   width: ${(props) => props.size || '24px'};
   height: ${(props) => props.size || '24px'};
   border-radius: 50%;
   overflow: hidden;
   > img {
      width: 100%;
   }
`;

export const NullableImg = (props: any) => {
   const { url } = props;
   return (
      <NullabeImgContainer>
      {url ? <img src={url} alt=""/> : null}
      </NullabeImgContainer>
   );
};

export const SummaryCategoriesContainer = styled.div`
   width: 100%;
   padding: 0 20px;
   .cat-L2 {
      user-select: none;
      cursor: pointer;
      padding: 10px;
      border-radius: 50px;
      border: 1px solid #999;
      margin: 0 3px;
      line-height: 45px;
      white-space: nowrap;
   }
   .cat-L2.active {
      color: white;
      background-color: #08979c;
      border-color: #20a382;
   }
   .cat-L2-more {
      pointer-events: none;
      position: relative;
      padding-left: 35px;
      background-color: #ccc;
      color: #999;
   }
   .cat-L2-more:before {
      background: url(/icons/lock.svg);
      width: 22px;
      height: 22px;
      position: absolute;
      content: "";
      left: 8px;
      top: 8px;
      background-size: contain;
      filter: grayscale(100%) invert(50%);
   }
   .cat-L3-title {
      color: #555;
      margin: 10px 0;
   }
   .cat-L3 {
      user-select: none;
      cursor: pointer;
      color: black;
      margin: 0 20px;
   }
   .cat-L3:after {
      color: black;
      content: "|";
      position: relative;
      left: 20px;
      pointer-events: none;
   }
   .cat-L3:last-child::after {
      content: "";
   }
`;

