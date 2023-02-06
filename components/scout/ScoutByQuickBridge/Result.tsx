import styled from "styled-components";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

import { useQuickbridgeSupplier } from "requests/useQuickbridgeSupplier";
import useBoundStore from "hooks/useBoundStore";
import { useViewport } from "hooks/useViewport";

const ResultCard = dynamic(() => import("components/scout/ResultCard"));
const Feedback = dynamic(() => import("components/scout/Feedback"));

interface Props {
  commodities: any;
  regions: any;
  suppliersData: any;
  supplierCount: number;
}

interface SearchProps {
  scrollPosition: number;
}

export default function QuickbridgeResult() {
    const quickbridge = useBoundStore((state) => state.quickbridge);
 
  const {
    suppliers,
    page,
    setPage,
    count,
    filter,
  } = quickbridge;
  const { scrollOffset } = useViewport();
  const { searchSuppliers, loading } = useQuickbridgeSupplier();
  const infiniteScrollControl = useRef(true);
  const countRef = useRef(count);
  const pageRef = useRef(1);
  const clearRef = useRef(false);
  const pageLoaded = useRef(false);


  useEffect(() => {
    getInitialRequests();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
   
    if (clearRef.current) {
      searchHandler();
      clearRef.current = false;
    }
  }, [filter]);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const getInitialRequests = () => {
    if (!pageLoaded.current) {
      pageLoaded.current = true;
      searchSuppliers(1, true);
     
    }
  };

  const searchSupplierHandler = async () => {
    const currentPage = pageRef.current;
    if (currentPage * 10 < countRef.current) {
      await searchSuppliers(currentPage + 1, false, "");
      pageRef.current = currentPage + 1;
      infiniteScrollControl.current = true;
    }
  };

  const handleScroll = async () => {
    var isAtBottom =
      document.documentElement.scrollHeight -
      document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom && infiniteScrollControl.current) {
      infiniteScrollControl.current = false;
      setPage(page + 1);
      await searchSupplierHandler();
    }
  };

  const searchHandler = () => {
    pageRef.current = 1;
    searchSuppliers(1, true);
    infiniteScrollControl.current = true;
  };


 const isSuppliersNotEmpty:boolean=suppliers?.length> 0 && Object.keys(suppliers[0]).length > 0
  return (
    <ScoutContainer>     
      <MainContainer>
   
        <MapResultContainer>         
          <ResultContainer>
            {(isSuppliersNotEmpty) ? (
              <>
                {suppliers.map((supplier: any, index: number) => (
                  <ResultCard data={supplier} key={`${supplier.id}_${index}`} />
                ))}
              </>
            ) : null}
          </ResultContainer>
                 
        </MapResultContainer>
      </MainContainer>
      <Feedback />
    </ScoutContainer>
  );
}

const Title=styled.div`
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 22px;
display: flex;
align-items: flex-end;
color: #445B66;
margin-top: 70px;
@media (max-width: ${(props) => props.theme.size.laptopL}) {
  margin-top: 50px;
  }
@media (max-width: ${(props) => props.theme.size.laptop}) {
  margin-top: 48px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
margin-top: 30px;
  }
`
const ScoutContainer = styled.div`
  // width: 1440px;
  width: 100%;
  margin: 0px 5px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: block;
    width: 100%;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
  margin: 10px 10px;
  }
`;

const SearchContainer = styled.div<{isrow:boolean}>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  flex-direction: ${(props) => (props.isrow? 'row'  : "column")};
  gap: 19px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    justify-content: space-between;
  }
  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    flex-direction: column;
  }
`;

const DuplicateHeaderForPosition = styled.div<SearchProps>`
  position: ${(props) => (props.scrollPosition > 126 ? "fixed" : "relative")};
  background-color: ${(props) => (props.scrollPosition > 126 ? "white" : "")};
  box-shadow: ${(props) =>
    props.scrollPosition > 126
      ? "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      : ""};
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  transition: background-color 100ms linear;
  transition: position 50ms linear;
  justify-content: center;
  height: 90px;
`;

const IconContainer = styled.div<{isrow:boolean}>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: ${(props) => (props.isrow? 'end'  : "center")};
  align-items: center;
  /* margin-right: 100px; */
  /* min-width: 240px; */
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const IconLabel = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const Label = styled.span`
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: #89A8B3;
`;

const Technology = styled.span`
  width: 100%;
`;

const TechnologyHeader = styled.span`
  margin-top: 32px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: flex-end;
  color: #006d75;
`;

const TechnologyContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 12px;
  padding-bottom: 32px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    flex-direction: column;
  }
`;

const TechnologySkeletonContainer = styled.div`
  display: flex;
  width: 100%;
  span {
    margin-right: 12px;
    margin-bottom: -21px;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    flex-direction: column;
  }
`;

const TechnologyBoxContainer = styled.div`
  display: contents;
`;

const MainContainer = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: row;
`;

const NoRecord = styled.div`
  margin-top: 16px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const MapResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    margin-left: 0;
  }
`;

const ResultContainer = styled.div`
`;

const CircleButton = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary}`};
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  margin-left: 15px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: flex;
  }
`;

const Button = styled.div<{ secondary?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px !important;
  background-color: ${(props) => (props.secondary ? "#F5F5F5" : "#08979C")};
  color: ${(props) => (props.secondary ? "#08979C;" : "#F5F5F5")};
  margin-bottom: 8px;
  border: 1px solid #08979c;
  padding: 12px;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;
