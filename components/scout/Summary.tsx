import { useEffect, useState } from "react";
import useStore from "hooks/useStore";
import {
   NullableImg,
   SummaryContainer,
   SummaryCategoryIcon,
   SummaryTitleColumn,
   SummaryTitle,
   SummaryL3Title,
   SummaryColumn,
   SummarySpaceColumn,
   SummaryLabel,
   SummaryTopList,
   SummaryTopListOne,
   SummarySupplierContainer,
   SummarySupplierTitle,
   SummaryCategoriesContainer,
} from "components/scout/Summary.styled";

import demoData, {
   L2L3tree,
   L2top, L2topLogo,
} from "components/scout/summaryCategoryData";

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

function doScore(q: any, q0: any) {
   if (q.length < 3) return 0;
   if (!q || !q0) return 0;
   q = q.toLowerCase();
   q0 = q0.toLowerCase();
   if (q0.indexOf(q) >= 0) {
      return q.length / q0.length;
   }
   return 0;
}

function determineSummary(filterData: any, suppliers: any): any {
   const summary: any = {};
   // TODO: determine summary title by filterData.q
   summary.lastQ = filterData.q;

   let nearest = [null, null, 0], score = 0;
   Object.keys(L2L3tree).forEach((key: string) => {
      const L2 = L2L3tree[key];
      const L3s = L2L3tree[key].L3;
      const s00 = doScore(summary.lastQ, L2.en) + 0.03;
      const s01 = doScore(summary.lastQ, L2.de) + 0.03;
      if (s00 > score) {
         nearest[0] = L2.en;
         nearest[1] = null;
         score = s00;
      }
      if (s01 > score) {
         nearest[0] = L2.en;
         nearest[1] = null;
         score = s01;
      }
if (s00 > 0.9) console.log('L2', L2.en, s00);
if (s01 > 0.9) console.log('L2', L2.de, s01);
      Object.keys(L3s).forEach((subkey: string) => {
         const L3 = L3s[subkey];
         const s1 = doScore(summary.lastQ, L3.en) + 0.02;
         if (s1 > score) {
            nearest[0] = L2.en;
            nearest[1] = L3.en;
            score = s1;
         }
if (s1 > 0.9) console.log('L3', L2.en, L3.en, s1);
      });
   });
   nearest[2] = score;
   summary.title = nearest[0];
   summary.L2selected = summary.title;
   summary.L3selected = nearest[1];

   if (summary.title) {
      summary.categories = demoData.L2L3[summary.title];
   } else {
      summary.title = summary.lastQ;
      summary.categories = null;
   }
   // TODO: rank suppliers by revenue; currently pick the first 10
   let selectedSuppliers;
   if (summary.title) {
      const matchedtop = summary.title.toLowerCase().split(/[\s/\-]+/).join(' ');
      selectedSuppliers = L2top.top[matchedtop]?.map((z: any) => ({
         logo: L2topLogo[L2top.cs[z]] ? `https://cdn-stage.supplybridge.com/images/logos/${L2topLogo[L2top.cs[z]]}` : null,
         name: L2top.cs[z],
      }));
   }
   if (!selectedSuppliers) selectedSuppliers = suppliers.slice(0, 9);
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
   const { flags, setFilterData } = useStore();
   const { L2, L2selected, L3, L3Selected } = props;
   if (!L2?.length) return null;

   const onL2Click = (L2: string) => {
      flags.q = L2;
      setFilterData({ q: L2 });
   }

   return (
      <SummaryCategoriesContainer>
         <div className="cat-L2-list">
            { L2.map((name: string, i: number) => (
                 <span
                    className={`cat-L2 ${name === L2selected?'active':''}`}
                    onClick={() => onL2Click(name)}
                    key={i}>
                 {name}
                 </span>
              )) }
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
  const { suppliers, filterData } = useStore();

  const [summary, setSummary] = useState(determineSummary(filterData, suppliers) || {});
  useEffect(() => {
     if (filterData.q === summary.lastQ) return;
     setSummary(determineSummary(filterData, suppliers));
  }, [suppliers]);

  if (!summary.L2selected) return null;

  return (
     <>
     <SummaryContainer><div>
        <SummaryColumn><SummaryCategoryIcon src={`https://stsupplybridgeprod.blob.core.windows.net/images/L2/${
           summary.title.split(/[\s/]+/).join('')
        }.jpeg`} /></SummaryColumn>
        <SummaryTitleColumn>
           <SummaryLabel></SummaryLabel>
           <SummaryTitle>{summary.title}</SummaryTitle>
           {summary.L3selected? (<SummaryL3Title>{summary.L3selected}</SummaryL3Title>) : null}
        </SummaryTitleColumn>
        <SummarySpaceColumn space={70}>
        {
           summary?.L2selected ? (<><SummaryLabel>Top Suppliers</SummaryLabel>
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
