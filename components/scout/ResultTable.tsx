import * as React from 'react';
import { styled } from '@mui/system';
import Icon from "components/Icon";
import useStore from "hooks/useStore";
import { NullableImg } from "components/scout/Summary.styled";

const regionMap: any = {
   '1': 'APAC',
   '2': 'AMERICAS',
   '3': 'EMEA',
}

const TableCell = styled('td')`
   padding: 15px 10px;
`;
const TableHead = styled('thead')``;
const TableBody = styled('tbody')``;
const TableRow = styled('tr')`
`;

const Result = styled('div')`
   display: flex;
   width: 100%;
`;

const ResultTable = styled('table')`
   width: 100%;
   overflow-wrap: break-word;
   overflow-x: auto;
   border-spacing: 0;
`;

const ResultTableContainer = styled('div')`
   & { background-color: transparent; }
   width: 100%;
   margin: 0 20px;
`;

const ResultTitleCell = styled('div')`
   display: inline-block;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
   background-color: white;
   margin-right: 5px;
   max-width: 500px;
`;

const ResultTableCellWithImg = styled(TableCell)`
   > div > span,
   > div > img {
      display: inline-block;
      height: 24px;
      margin-right: 3px;
   }
   > div {
      line-height: 22px;
      display: flex;
   }
`;

const ResultTableHeadRow = styled(TableRow)`
   &>:nth-child(2) {
      left: 0;
      position: sticky;
      background-color: #edf1f3;
   }
`;

const ResultTableRow = styled(TableRow)`
   background-color: white;
   border-radius: 10px;
   &>:first-child {
      border-radius: 10px 0 0 10px;
      box-shadow: 0px -3px 2px -3px rgba(0, 0, 0, 0.2) inset;
   }
   &>:last-child {
      border-radius: 0 10px 10px 0;
      box-shadow: -2px -3px 2px -3px rgba(0, 0, 0, 0.2) inset;
   }
   &>:nth-child(2) {
      left: 0;
      position: sticky;
   }
   > td {
      border-radius: 0;
      border-bottom: 5px solid #edf1f3;
      box-shadow: 0px -3px 0px -2px rgba(0, 0, 0, 0.1) inset;
   }
`;

const ResultHeadCell = styled(TableCell)`
   background-color: transparancy;
   color: #ccc;
`;

const IdCell = styled(TableCell)`
   max-width: 50px;
`;

const CompetenceCell = styled(TableCell)`
   max-width: 200px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

const BadgeContainer = styled('span')`
   background-color: ${(props) => props.color || '#08979C'};
   color: white;
   display: inline-block;
   border-radius: 50%;
   padding: 3px 4px 0 4px;
   margin-right: 3px;
   margin-top: -3px;
`

const BadgeListContainer = styled('div')`
   white-space: nowrap;
`;

const Badge = (props: any) => <Icon src={props?.icon} width={20} height={20} hover tooltip={props?.label}/>;

const BadgeList = (props: any) => {
   const { data } = props;
   return (<BadgeListContainer>
      <BadgeContainer><Badge icon={"verified"} label={"Verified Supplier"} /></BadgeContainer>
      {data.isInnovation ? (<BadgeContainer color={"#eb2f96"}><Badge icon={"innovation"} label={"innovation"} /></BadgeContainer>) : null }
   </BadgeListContainer>);
}

export default function BasicTable() {
  const { suppliers } = useStore();
  const data = suppliers?.map((x: any) => ({
     logo: x.logo,
     name: x.name,
     longName: x.longName,
     headquarter: x.headquarter,
     supplierCategory: x.supplierCategory?.lvlThreeEnglishName || '',
     coreCompetence: (x.products || []).map((z: any) => z?.coreCompetency?.name).filter((z: any) => !!z).join(', '),
     isInnovation: x.isInnovation,
  }));
  return !data?.length ? null : (
    <Result><ResultTableContainer>
      <ResultTable aria-label="simple table">
        <TableHead>
          <ResultTableHeadRow>
            <ResultHeadCell sx={{width: '50px'}}>&nbsp;</ResultHeadCell>
            <ResultHeadCell>Organization</ResultHeadCell>
            <ResultHeadCell>HQ Location</ResultHeadCell>
            <ResultHeadCell>Global Footprint</ResultHeadCell>
            <ResultHeadCell>Category</ResultHeadCell>
          </ResultTableHeadRow>
        </TableHead>
        <TableBody>
          {data.map((row: any, i: number) => (
            <ResultTableRow key={i}>
              <IdCell>{i+1}</IdCell>
              <ResultTableCellWithImg sx={{'min-width': '30%', 'padding-right': '30px'}}><div>
                 <NullableImg url={row.logo} />
                 <ResultTitleCell><a title={row.longName || row.name}>{row.longName || row.name}</a></ResultTitleCell>
                 <BadgeList data={row} />
              </div></ResultTableCellWithImg>
              <ResultTableCellWithImg><div>
                 <NullableImg url={row.headquarter?.code ? `/flags/${row.headquarter?.code?.toLowerCase()}.svg` : ''} />
                 <div>{row.headquarter?.name}</div>
              </div></ResultTableCellWithImg>
              <TableCell>{regionMap[row.headquarter?.regionId] || ''}</TableCell>
              <CompetenceCell><a title={row.supplierCategory}>{row.supplierCategory}</a></CompetenceCell>
            </ResultTableRow>
          ))}
        </TableBody>
      </ResultTable>
    </ResultTableContainer></Result>
  );
}
