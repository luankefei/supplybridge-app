import { useState } from 'react';
import { Button } from 'components';
import Head from 'next/head'
import Link from 'next/link';
import styled from "styled-components";

export default function Home() {

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <Container>
      <Head>
        <title>Main | Supply Bridge</title>
        <meta name="description" content="Main page of the Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <HeaderLogo src="/icons/logo.svg" />
        <NavContainer>
          <Link href="/">
            <NavTitle>Home</NavTitle>
          </Link>
          <Link href="/">
            <NavTitle>Solutions</NavTitle>
          </Link>
          <Link href="/">
            <NavTitle>Become Supplier</NavTitle>
          </Link>
          <Link href="/">
            <NavTitle>Careers</NavTitle>
          </Link>
          <Link href="/">
            <NavTitle>About Us</NavTitle>
          </Link>
        </NavContainer>
        <Buttons>
          <HeaderLoginButton>
            Login
          </HeaderLoginButton>
          <HeaderRegisterButton
          >
            Register
          </HeaderRegisterButton>
        </Buttons>
        <MenuIcon onClick={() => setOpenMobileMenu(true)} src="/icons/menu.png" />
      </Header>

      <SlideContainer>
        <SlideTextContainer>
          <SlideText>
            We build bridges <br />
            between Supply <br />
            and Demand
          </SlideText>
        </SlideTextContainer>
        <SlideImageContainer>
          <SlideImage src="/images/slide-img.svg" alt="slide_img"></SlideImage>
        </SlideImageContainer>
      </SlideContainer>

      <SupplierContainer>
        <SupplierTextContainer>
          <SupplierTextTitle>
            Our Business
          </SupplierTextTitle>
          <SupplierText>
            With our innovative and insightful technology, we strive to enhance our users’ every day experiences.<br /><br />
            Founded in 2022, our incredible team of engineers, programmers, designers and Industry experts have worked tirelessly to bring Supply Bridge to the forefront of the industry.
          </SupplierText>
          <SupplierButtonContainer>
            <Button> Become a Supplier</Button>
          </SupplierButtonContainer>
        </SupplierTextContainer>

        <SupplierImageContainer>
          <SupplierImage src="/images/become-a-supplier.png" alt="become_a_supplier" />
        </SupplierImageContainer>
      </SupplierContainer>

      <VideoContainer>
        <VideoTextContainer>
          <VideoTitle>
            Big results <br />
            require big <br />
            ambitions
          </VideoTitle>
          <VideoText>
            At Supply Bridge, we believe that our solutions will soon become one of the biggest turn-key solution in the industry. We’ve only just started, but we already know that every product we build requires hard-earned skills, dedication and a daring atitude.
          </VideoText>
        </VideoTextContainer>
        <VideoPlayIcon src="/icons/play.svg" alt="play" width="100px" height="100px">
        </VideoPlayIcon>
      </VideoContainer>

      <PlatformContainer>
        <PlatformHead>
          <PlatformHeadTitle>
            A trusted leader in B2B-SaaS <br />
            Platform with AI + Blockchain
          </PlatformHeadTitle>
          <PlatformHeadButton>
            <Button>
              Get Started Today
            </Button>
          </PlatformHeadButton>
        </PlatformHead>
        <PlatformContent>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(64, 162, 225, 0.2)">
              <PlatformCardIcon src="/icons/scout-index.svg" alt="scout" width="35px" height="auto" />
            </PlatformCardIconBox>
            <PlatformCardTitle>
              Scout
            </PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>

          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(214, 142, 46, 0.2)">
              <PlatformCardIcon src="/icons/trace-index.svg" alt="scout" width="35px" height="auto" />
            </PlatformCardIconBox>
            <PlatformCardTitle>
              Trace
            </PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>

            <PlatformCardIconBox backgroundColor="rgb(106, 218, 194, 0.2)">
              <PlatformCardIcon src="/icons/finance-index.svg" alt="scout" width="35px" height="auto" />
            </PlatformCardIconBox>
            <PlatformCardTitle>
              Finance
            </PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(200, 81, 200, 0.25)">
              <PlatformCardIcon src="/icons/evaluate-index.svg" alt="scout" width="35px" height="auto" />
            </PlatformCardIconBox>
            <PlatformCardTitle>
              Evaluate
            </PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(133, 130, 224, 0.2)">
              <PlatformCardIcon src="/icons/source-index.svg" alt="scout" width="35px" height="auto" />
            </PlatformCardIconBox>
            <PlatformCardTitle>
              Source
            </PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(197, 35, 0, 0.2)">
              <PlatformCardIcon src="/icons/transport-index.svg" alt="scout" width="35px" height="auto" />
            </PlatformCardIconBox>
            <PlatformCardTitle>
              Transport
            </PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(204, 228, 236, 0.5)">
              <PlatformCardIcon src="/icons/solution-index.svg" alt="scout" width="35px" height="auto" />
            </PlatformCardIconBox>
            <PlatformCardTitle>
              Build Total Solution
            </PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
        </PlatformContent>
      </PlatformContainer>

      <ContactContainer>
        <ContactContainerLeft>
          <ContactContainerTitle>
            Want to learn more?
          </ContactContainerTitle>
          <ContactContainerText>
            If you have questions about how the B2B/SaaS<br />
            can enhance your business, please reach out.
          </ContactContainerText>
          <ContactContainerForm>
            <ContactContainerFormLeft>
              <ContactContainerInput placeholder='Name' />
              <ContactContainerInput placeholder='Email' />
              <ContactContainerInput placeholder='Subject' />
            </ContactContainerFormLeft>
            <ContactContainerFormRight>
              <ContactContainerMessageInput placeholder='Message' />
              <ContactContainerFormButton>Submit</ContactContainerFormButton>
            </ContactContainerFormRight>

          </ContactContainerForm>

        </ContactContainerLeft>
        <ContactContainerRight>
          <ContactContainerBackground src="/images/contact-bg.png" alt="contact_bg" width="auto" height="330px" />
          <ContactContainerImage src="/images/contact-img.png" alt="contact_img" width="443px" height="507px" />
        </ContactContainerRight>
      </ContactContainer>

      <Footer>
        <FooterTop>

          <FooterContactContainer>
            <FooterTitle>Contact Us</FooterTitle>
            <FooterLink><FooterIcon src='/icons/mail.svg' /><span>investors@supplybridge.com</span> </FooterLink>
            <FooterLink><FooterIcon src='/icons/phone.svg' /> <span>123.456.7890</span></FooterLink>
          </FooterContactContainer>

          <FooterLinks>
            <FooterTitle><span>Supply Bridge</span></FooterTitle>
            <FooterLink><span>Solutions</span></FooterLink>
            <FooterLink><span>About Us</span></FooterLink>
            <FooterLink><span>Careers</span></FooterLink>
            <FooterLink><span>Become Supplier</span></FooterLink>
          </FooterLinks>

          <FooterSocialMedia>
            <FooterTitle>Follow Us</FooterTitle>
            <FooterLink><FooterIcon src='/icons/linkedin.svg' /><span>Linkedin</span></FooterLink>
            <FooterLink><FooterIcon src='/icons/facebook.svg' /><span>Facebook</span></FooterLink>
            <FooterLink><FooterIcon src='/icons/twitter.svg' /><span>Twitter</span></FooterLink>
          </FooterSocialMedia>
          <FooterNewsletter>
            <FooterTitle>Join Newsletter </FooterTitle>
            <span>
              <FooterNewsletterInput placeholder='your@email.com' />
              <FooterIcon src='/icons/send.svg' />
            </span>
          </FooterNewsletter>
        </FooterTop>
        <FooterBottom>
          <FooterCopyright>
            Supply Bridge © Copyright 2022
          </FooterCopyright>
          <FooterLogo src='/icons/footer-icon.svg' />
          <FooterTerms>
            <Link href="/">Privacy Policy</Link> <span />|<span /> <Link href="/">Terms of Service</Link>
          </FooterTerms>
        </FooterBottom>
      </Footer>
      <FooterSpace />

      <MobileMenu openMobileMenu={openMobileMenu}>
        <MobileMenuHeader>
          <FooterLogo src="/icons/footer-icon.svg" />
          <CloseIcon src="/icons/close.png" onClick={() => setOpenMobileMenu(false)} />
        </MobileMenuHeader>
        <MobileMenuList>
          {/* <MobileMenuListItem>Home</MobileMenuListItem> */}
          <MobileMenuListItem>Solution</MobileMenuListItem>
          <MobileMenuListItem>Become Supplier</MobileMenuListItem>
          <MobileMenuListItem>Careers</MobileMenuListItem>
          <MobileMenuListItem>About Us</MobileMenuListItem>

        </MobileMenuList>
        <MobileMenuButtons>
          <MobileButton>Login</MobileButton>
          <MobileButton>Register</MobileButton>

        </MobileMenuButtons>
      </MobileMenu>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 20px 0 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #1A1A1A;
  position: relative;
`;

// HEADER
const Header = styled.div`
  width: 100%;
  height: 93px;
  padding: 0 60px 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    padding: 0 10px 0 10px;
  }
`;

const HeaderLogo = styled.img`
  width: 350px;
  height: auto;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    width: 25%;
    height: auto;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 40%;
    min-width: 250px;
  }
`

const NavContainer = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const NavTitle = styled.div`
  margin-right: 48px;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    margin-right: 24px;
  }

`;

const Buttons = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const MenuIcon = styled.img`
  display: none;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const HeaderLoginButton = styled.div`
  padding: 9px 17px;
  background-color: #fff;
  color: #000000;
  border: 0.3px solid rgb(8, 151, 156, 0.4);
  border-radius: 4px;
  &:hover {
    border: 1px solid rgb(8, 151, 156);
    cursor: pointer;
  }
`;

const HeaderRegisterButton = styled.div`
  padding: 9px 17px;;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  margin-left: 14px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

// Slide Container

const SlideContainer = styled.div`
  background-image: url(/images/slide.jpg);
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  height: 50%;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    height: 45%;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    flex-direction: column;
  }
`;

const SlideTextContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-end;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    /* width: 45%; */
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 100%;
  }
`;

const SlideText = styled.h1`
  color: #fff;
  font-style: normal;
  font-weight: 500;
  font-size: 64px;
  line-height: 72px;
  display: inline-block;
  margin-left: 5vw;
  margin-bottom: 70px;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    line-height: 64px;
    font-size: 56px;
  }
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    
  }
  `;

const SlideImageContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
  align-items: center;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    width: 100%;
  }
`;

const SlideImage = styled.img`
 object-fit: contain;
 height: 100%;
 padding: 40px 0 40px 0;
 @media (max-width: ${(props) => props.theme.size.laptopL}) {
  height: 95%;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
  height: 650px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
  height: 500px;
  }
  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
  height: 400px;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
  display: none;
  }
  
`


// Supplier Container
const SupplierContainer = styled.div`
  height: 820px;
  display: flex;
  padding: 0 160px 0 160px;
  align-items: center;
  justify-content: center;
`;

const SupplierTextContainer = styled.div`
  width: 35%;
`;

const SupplierTextTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 43.5px;
  line-height: 50px;
  color: #1A1A1A;
`

const SupplierText = styled.h4`
  font-style: normal;
  font-weight: 400;
  font-size: 19.5px;
  line-height: 22px;
  color: #1A1A1A;
`

const SupplierButtonContainer = styled.div`
  width: 189px;
`;

const SupplierImageContainer = styled.div`
  /* width: 60%; */
  margin-left: 100px;
`;

const SupplierImage = styled.img`
  height: 500px;
  filter: grayscale(100%);
`;


//Video Container
const VideoContainer = styled.div`
  max-width: 1440px;
  background-image: url(/images/video-img.jpg);
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.4);
  display: flex;
  height: 700px;
  position: relative;
  margin: 0 auto;
`;

const VideoTextContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 0 0 70px 83px;
`;

const VideoTitle = styled.h1`
font-style: normal;
font-weight: 500;
font-size: 66px;
line-height: 76px;
color: #FFFFFF;
margin: 0;
`;

const VideoText = styled.h4`
font-style: normal;
font-weight: 300;
font-size: 19.5px;
line-height: 22px;
color: #FFFFFF;
margin-top: 30px;
`

const VideoPlayIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  &:hover {
    
  }
`;


// Platform Container
const PlatformContainer = styled.div`
  max-width: ${(props) => props.theme.size.laptopL};
  padding: 150px 0 150px 0;
  margin: 0 auto;
`;

const PlatformHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PlatformHeadTitle = styled.div`
font-style: normal;
font-weight: 500;
font-size: 43.5px;
line-height: 50px;
color: #000000;
`;

const PlatformHeadButton = styled.div`
  width: 180px;
`;


const PlatformContent = styled.div`
  margin-top: 50px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto auto;
  row-gap: 70px;
`;

const PlatformCard = styled.div`
  width: 280px;
`;

const PlatformCardIconBox = styled.div<{ backgroundColor?: string }>`
  width: 65px;
  height: 65px;
  background-color: ${(props) => `${props.backgroundColor} !important`};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlatformCardIcon = styled.img`
 
`

const PlatformCardTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  margin: 17px 0 17px 0;
`;

const PlatformCardText = styled.h4`
  font-style: normal;
  font-weight: 400;
  font-size: 19.5px;
  line-height: 22px;
  color: #000000;
  opacity: 0.4;
  margin: unset;
`;

// Contact Container

const ContactContainer = styled.div`
  background-color: #CCE4EC;
  max-width: 1440px;
  height: 432px;
  margin: 0 auto;
  border-radius: 20px;
  display: flex;
  position: relative;
`;

const ContactContainerLeft = styled.div`
  width: 532px;
  margin-left: 84px;
  margin-bottom: 63px;

`;

const ContactContainerTitle = styled.h1`
  font-weight: 500;
  font-size: 43.5px;
  line-height: 50px;
  color: #000000;
`;

const ContactContainerText = styled.h4`
  font-weight: 400;
  font-size: 19.5px;
  line-height: 22px;
  color: #000000;
`;

const ContactContainerForm = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45%;
`;

const ContactContainerFormLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContactContainerFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContactContainerInput = styled.input`
  border: 0.75px solid #000000;
  border-radius: 4px;
  width: 255px;
  height: 43px;
  padding: 9px 18px;
  background-color: transparent;
  font-size: 18px;
  &:focus {
    outline: none !important;
    border: 3px solid ${(props) => props.theme.colors.primary};
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: 'Ubuntu';
    font-style: normal; 
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
  }
  :-ms-input-placeholder {
    font-family: 'Ubuntu';
    font-style: normal; 
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
  }
`;

const ContactContainerMessageInput = styled.textarea`
  border: 0.75px solid #000000;
  border-radius: 4px;
  font-family: 'Ubuntu';
  width: 255px;
  height: 106px;
  padding: 9px 18px;
  background-color: transparent;
  font-size: 18px;
  resize: none;
  &:focus {
    outline: none !important;
    border: 3px solid ${(props) => props.theme.colors.primary};
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: 'Ubuntu';
    font-style: normal; 
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    vertical-align: text-top;
  }
  :-ms-input-placeholder {
    font-family: 'Ubuntu';
    font-style: normal; 
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
  }
`;

const ContactContainerFormButton = styled.div`
  width: 255px;
  height: 43px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const ContactContainerRight = styled.div`

`;

const ContactContainerBackground = styled.img`
  opacity: 0.4;
  position: absolute;
  right: 0;
`;

const ContactContainerImage = styled.img`
  position: absolute;
  object-fit: cover;
  overflow-x: visible;
  bottom: 0;
  right: 75px;
`;

// Footer

const Footer = styled.div`
background-color: #000000;
  border-radius: 20px;
  /* box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.4); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 576px;
  margin-top: 160px;
  color: #fff;
  padding: 118px 110px 35px 110px;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FooterIcon = styled.img`
  /* width: 32px;
  height: 32px; */
  margin-right: 9px;
`;

const FooterContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FooterTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
`;

const FooterLink = styled.span`
  font-weight: 300;
  font-size: 19.5px;
  line-height: 22px;
  /* opacity: 0.7; */
  display: flex;
  align-items: center;
  span {
    opacity: 0.7;
  }
  span:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FooterSocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FooterNewsletter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  span {
    display: flex;
    align-items: center;
  }
`;

const FooterNewsletterInput = styled.input`
  height: 42px;
  width: 198px;
  margin-right: 5px;
  border-radius: 20px;
  border: 0.75px solid #fff;
  background-color: transparent;
  padding-left: 17px;
  font-family: 'Ubuntu';
  font-weight: 400;
  font-size: 16.5px;
  line-height: 19px;
  color: #FFFFFF;
  opacity: 0.7;
  &:focus {
    outline: none !important;
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: 'Ubuntu';
    font-weight: 400;
    font-size: 16.5px;
    line-height: 19px;
    color: #FFFFFF;
    opacity: 0.7;
  }
  :-ms-input-placeholder {
    font-family: 'Ubuntu';
    font-weight: 400;
    font-size: 16.5px;
    line-height: 19px;
    color: #FFFFFF;
    opacity: 0.7;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 300;
  font-size: 16.5px;
  line-height: 19px;
`;

const FooterCopyright = styled.div`
  opacity: 0.67;
`;

const FooterLogo = styled.img`

`;

const FooterTerms = styled.div`
  opacity: 0.67;
  span {
    margin: 0 20px;
  }
  a:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const FooterSpace = styled.div`
  height: 26px;
`;



const MobileMenu = styled.div<{ openMobileMenu: boolean }>`
    display: ${(props) => props.openMobileMenu ? "block" : "none"};
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    height: auto;
    width: 50%;
    position: absolute;
    border-radius: 15px;
    top: 10px;
    right: 0;
    background-color: ${(props) => props.theme.colors.primary};
    z-index: 100;
    box-shadow: rgba(0, 0, 0.5, 0.5) 0px 10px 50px;
  }

  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 100%;
  }

`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const CloseIcon = styled.img`
  width: 50px;
  height: 50px;
  &:hover {
    cursor: pointer;
  }
`;

const MobileMenuList = styled.div`
  display: flex;
  margin-top: 15px;
  flex-direction: column;
  padding: 20px;
`;

const MobileMenuListItem = styled.div`
  height: 50px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

const MobileMenuButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const MobileButton = styled.div`
  padding: 9px 17px;;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  margin-left: 14px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  border: 3px solid #fff;
`;

