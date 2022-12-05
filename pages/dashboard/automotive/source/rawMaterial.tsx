import { Icon } from "components";
import { Header } from "components/Header";
import Head from "next/head";
import styled from "styled-components";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

export default function RawMaterial() {
  const [option, setOption] = useState('option1')

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value)
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
            value={option}
            onChange={handleChange}
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
            <MenuItem value={"option1"}>Option 1</MenuItem>
            <MenuItem value={"option2"}>Option 2</MenuItem>
            <MenuItem value={"option3"}>Option 3</MenuItem>
          </Select>
        </FormControl>
        <SubTitle>or</SubTitle>
        <FormControl sx={{ m: 2, width: 560 }}>
          <Select
            id="demo-simple-select-helper"
            value={option}
            onChange={handleChange}
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
            <MenuItem value={"option1"}>Option 1</MenuItem>
            <MenuItem value={"option2"}>Option 2</MenuItem>
            <MenuItem value={"option3"}>Option 3</MenuItem>
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