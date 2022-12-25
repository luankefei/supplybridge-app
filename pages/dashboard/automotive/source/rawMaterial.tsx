import { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import dynamic from "next/dynamic";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl } from "@mui/material";
import Link from "next/link";

const Icon = dynamic(() => import("components/Icon"));
const Header = dynamic(() => import("components/Header"));

export default function RawMaterial() {
  const [optionPrimary, setOptionPrimary] = useState('option1')
  const [optionSecondary, setOptionSecondary] = useState('option1')

  const handleChangePrimary = (event: SelectChangeEvent) => {
    setOptionPrimary(event.target.value)
  };
  const handleChangeSecondary = (event: SelectChangeEvent) => {
    setOptionSecondary(event.target.value)
  };

  return (
    <>
      <Head>
        <title>Sourcing | Supply Bridge</title>
        <meta name="description" content="Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Link href="/dashboard/automotive/source">
          <BackButton>
            <BackButtonIcon src="/icons/chevron-down.svg" />
            <BackButtonText>Back</BackButtonText>
          </BackButton>
        </Link>
        <Icon src="raw-material-black" width={120} height={88} />
        <Title>Raw Material</Title>
        <SubTitle>Choose a method to find suppliers</SubTitle>
        <FormControl sx={{ m: 2, width: 560 }}>
          <Select
            id="demo-simple-select-helper"
            value={optionPrimary}
            onChange={handleChangePrimary}
            sx={{
              width: 560,
              height: 88,
              color: "#2A3840",
              backgroundColor: "#fff",
              fontFamily: 'Ubuntu',
              fontSize: 20,
              fontWeight: 500,
              paddingLeft: 4
            }}
          >
            <MenuItem value={"option1"}>Primary Material</MenuItem>
            {/* <MenuItem value={"option2"}>Option 2</MenuItem>
            <MenuItem value={"option3"}>Option 3</MenuItem> */}
          </Select>
        </FormControl>
        <SubTitle>or</SubTitle>
        <FormControl sx={{ m: 2, width: 560 }}>
          <Select
            id="demo-simple-select-helper"
            value={optionSecondary}
            onChange={handleChangeSecondary}
            sx={{
              width: 560,
              height: 88,
              color: "#2A3840",
              backgroundColor: "#fff",
              fontFamily: 'Ubuntu',
              fontSize: 20,
              fontWeight: 500,
              paddingLeft: 4
            }}
          >
            <MenuItem value={"option1"}>Secondary Material</MenuItem>
            {/* <MenuItem value={"option2"}>Option 2</MenuItem>
            <MenuItem value={"option3"}>Option 3</MenuItem> */}
          </Select>
        </FormControl>

      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  position: relative;
`;

const Title = styled.h3`
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 32px;
text-align: center;
color: #2A3840;
`;

const SubTitle = styled.h4`
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 28px;
text-align: center;
color: #65808C;
`;

const BackButton = styled.div`
position: absolute;
display: flex;
top: 0;
left: 10%;
&:hover {
  cursor: pointer;
}
`;

const BackButtonIcon = styled.img`
  width: 30px;
  transform: rotate(90deg);
`;

const BackButtonText = styled.h4`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: #08979C;
`;