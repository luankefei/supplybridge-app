import styled from "styled-components";

const DescContainer = styled.div`
  position: fixed;
  top: calc(50% - 50px);
  left: 580px;
  color: #FAFAFA;
  user-select: none;
`;
const DescTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  line-height: 46px;
`;
const DescSubtitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
`;

const Introduction = () => {
   return (
     <DescContainer>
       <DescTitle>We build bridges between Supply and Demand</DescTitle>
       <DescSubtitle>All-in-One &#34;Supply Chain-as-a-Service&#34; Platform</DescSubtitle>
     </DescContainer>
   );
};

export default Introduction;
