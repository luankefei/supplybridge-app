import { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import styled from "styled-components";

import Button from 'components/Button';

export default function Home() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <Container>
      <Head>
        <title>Home Page | Supply Bridge</title>
        <meta name="description" content="Home page of the Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <HeaderLogo src="/icons/main-logo.svg" />
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
            <Link href="/login">
              Login
            </Link>
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
          <SupplierTextTitle>Our Business</SupplierTextTitle>
          <SupplierText>
            With our innovative and insightful technology, we strive to enhance
            our users’ every day experiences.
            <br />
            <br />
            Founded in 2022, our incredible team of engineers, programmers,
            designers and Industry experts have worked tirelessly to bring
            Supply Bridge to the forefront of the industry.
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
            At Supply Bridge, we believe that our solutions will soon become one
            of the biggest turn-key solution in the industry. We’ve only just
            started, but we already know that every product we build requires
            hard-earned skills, dedication and a daring atitude.
          </VideoText>
        </VideoTextContainer>
        <VideoPlayIcon
          src="/icons/play.svg"
          alt="play"
          width="100px"
          height="100px"
        ></VideoPlayIcon>
      </VideoContainer>

      <PlatformContainer>
        <PlatformHead>
          <PlatformHeadTitle>
            A trusted leader in B2B-SaaS <br />
            Platform with AI + Blockchain
          </PlatformHeadTitle>
          <PlatformHeadButton>
            <Button>Get Started Today</Button>
          </PlatformHeadButton>
        </PlatformHead>
        <PlatformContent>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(64, 162, 225, 0.2)">
              <PlatformCardIcon
                src="/icons/scout-index.svg"
                alt="scout"
                width="35px"
                height="auto"
              />
            </PlatformCardIconBox>
            <PlatformCardTitle>Scout</PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>

          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(214, 142, 46, 0.2)">
              <PlatformCardIcon
                src="/icons/trace-index.svg"
                alt="scout"
                width="35px"
                height="auto"
              />
            </PlatformCardIconBox>
            <PlatformCardTitle>Trace</PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(106, 218, 194, 0.2)">
              <PlatformCardIcon
                src="/icons/finance-index.svg"
                alt="scout"
                width="35px"
                height="auto"
              />
            </PlatformCardIconBox>
            <PlatformCardTitle>Finance</PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(200, 81, 200, 0.25)">
              <PlatformCardIcon
                src="/icons/evaluate-index.svg"
                alt="scout"
                width="35px"
                height="auto"
              />
            </PlatformCardIconBox>
            <PlatformCardTitle>Evaluate</PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(133, 130, 224, 0.2)">
              <PlatformCardIcon
                src="/icons/source-index.svg"
                alt="scout"
                width="35px"
                height="auto"
              />
            </PlatformCardIconBox>
            <PlatformCardTitle>Source</PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(197, 35, 0, 0.2)">
              <PlatformCardIcon
                src="/icons/transport-index.svg"
                alt="scout"
                width="35px"
                height="auto"
              />
            </PlatformCardIconBox>
            <PlatformCardTitle>Transport</PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
          <PlatformCard>
            <PlatformCardIconBox backgroundColor="rgb(204, 228, 236, 0.5)">
              <PlatformCardIcon
                src="/icons/solution-index.svg"
                alt="scout"
                width="35px"
                height="auto"
              />
            </PlatformCardIconBox>
            <PlatformCardTitle>Build Total Solution</PlatformCardTitle>
            <PlatformCardText>
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry. Lorem Ipsum
            </PlatformCardText>
          </PlatformCard>
        </PlatformContent>
      </PlatformContainer>

      <ContactContainer>
        <ContactContainerLeft>
          <ContactContainerTitle>Want to learn more?</ContactContainerTitle>
          <ContactContainerText>
            If you have questions about how the B2B/SaaS
            <br />
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
  );
}

const Container = styled.div`
  margin: 0 20px 0 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #1A1A1A;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// HEADER
const Header = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.size.laptopXl};
  height: 93px;
  padding: 0 60px 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    padding: 0 10px 0 10px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    border-bottom: 1px solid rgb(0, 0, 0, 0.2);
    margin-bottom: 20px;
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
  background-color: ${(props) => props.theme.colors.secondary};
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
  width: 100%;
  max-width: ${(props) => props.theme.size.laptopXl};
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
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    height: 500px;
    justify-content: end;
    align-items: center;
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
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
    font-size: 36px;
    line-height: 48px;
    margin-bottom: 64px;
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
  max-width: 1440px;
  display: flex;
  /* margin: 0 auto; */
  align-items: center;
  justify-content: space-between;
  padding: 0 60px 0 60px;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
  /* padding: 0 160px 0 160px; */
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
  flex-direction: column-reverse;
  justify-content: space-evenly;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
  width: 100%;
  padding: 0 20px 0 20px;
  margin: 40px 0;
  }
`;

const SupplierTextContainer = styled.div`
  width: 35%;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
  width: 90%;
  }
`;

const SupplierTextTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 43.5px;
  line-height: 50px;
  color: #1a1a1a;
`;

const SupplierText = styled.h4`
  font-style: normal;
  font-weight: 400;
  font-size: 19.5px;
  line-height: 22px;
  color: #1a1a1a;
`;

const SupplierButtonContainer = styled.div`
  width: 189px;
`;

const SupplierImageContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
  width: 100%;
  }
`;

const SupplierImage = styled.img`
  height: auto;
  width: 90%;
  filter: grayscale(100%);
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
  width: 80%;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
  width: 70%;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
  width: 90%;
  }
  @media (max-width: ${(props) => props.theme.size.mobileL}) {
  width: 100%
  }
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
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 100%
  }
`;

const VideoTextContainer = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 0 0 70px 83px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 20px;
  }
`;

const VideoTitle = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 66px;
  line-height: 76px;
  color: #ffffff;
  margin: 0;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    font-size: 48px;
    line-height: 48px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    margin-top: 100px;
    opacity: 0.8;
  }
`;

const VideoText = styled.h4`
  font-style: normal;
  font-weight: 300;
  font-size: 19.5px;
  line-height: 22px;
  color: #ffffff;
  margin-top: 30px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    text-align: center;
  }
`;

const VideoPlayIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  &:hover {
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    left: 35%;
  }
`;

// Platform Container
const PlatformContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 150px 60px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    padding: 120px 30px;
  }
`;

const PlatformHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    flex-direction: column;
  }
`;

const PlatformHeadTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 43.5px;
  line-height: 50px;
  color: #000000;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    font-size: 32px;
    text-align: center;
  }
`;

const PlatformHeadButton = styled.div`
  width: 180px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    margin: 20px 0;
  }
`;

const PlatformContent = styled.div`
  margin-top: 50px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto auto;
  row-gap: 70px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    grid-template-columns: auto auto;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    grid-template-columns: auto;
  }
`;

const PlatformCard = styled.div`
  width: 280px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
    width: 100%;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
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

const PlatformCardIcon = styled.img``;

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
  width: 100%;
  max-width: 1440px;
  height: 432px;
  /* margin: 0 auto; */
  border-radius: 20px;
  display: flex;
  position: relative;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    height: 100%;
  }
`;

const ContactContainerLeft = styled.div`
  width: 532px;
  z-index: 1;
  margin-left: 84px;
  margin-bottom: 63px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    margin: 0 auto;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    margin: 0 auto;
  }

`;

const ContactContainerTitle = styled.h1`
  font-weight: 500;
  font-size: 43.5px;
  line-height: 50px;
  color: #000000;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: flex;
    justify-content: center;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    text-align: center;
  }
  
`;

const ContactContainerText = styled.h4`
  font-weight: 400;
  font-size: 19.5px;
  line-height: 22px;
  color: #000000;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: flex;
    justify-content: center;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    text-align: center;
  }
`;

const ContactContainerForm = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45%;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-start;
  }
`;

const ContactContainerFormLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 100%;
    align-items: center;
  }
  
`;

const ContactContainerFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 100%;
    align-items: center;
  }
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
    border: 3px solid ${(props) => props.theme.colors.secondary};
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
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 90%;
    margin-bottom: 20px;
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
    border: 3px solid ${(props) => props.theme.colors.secondary};
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
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    width: 90%;
    margin-bottom: 20px;
  }
`;

const ContactContainerFormButton = styled.div`
  width: 255px;
  height: 43px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    margin-bottom: 20px;
  }
`;

const ContactContainerRight = styled.div``;

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
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

// Footer

const Footer = styled.div`
  width: 100%;
  background-color: #000000;  
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 576px;
  margin-top: 160px;
  color: #fff;
  padding: 118px 110px 35px 110px;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    padding: 118px 60px 35px 60px;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    height: 100%;
    padding: 60px 60px 35px 60px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    height: 100%;
    padding: 60px 30px 35px 30px;
  }
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    margin-bottom: 50px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    display: flex;
    flex-direction: column;
  }
`;

const FooterIcon = styled.img`
  margin-right: 9px;
`;

const FooterContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    gap: 15px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  }
`;

const FooterTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    text-align: center;
  }
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
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    gap: 15px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    text-align: center;
    margin-top: 45px;
  }
`;

const FooterSocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    gap: 15px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    text-align: center;
    margin-top: 45px;
  }
`;

const FooterNewsletter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  span {
    display: flex;
    align-items: center;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    gap: 15px;
    margin-top: 45px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    display: flex;
    flex-direction: column;
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
    border: 1px solid ${(props) => props.theme.colors.secondary};
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
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    margin-top: 35px;
  }
`;

const FooterCopyright = styled.div`
  opacity: 0.67;
`;

const FooterLogo = styled.img`
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    margin-top: 20px;
  }
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
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    span {
      margin: 0 5px;
    }
    @media (max-width: ${(props) => props.theme.size.tablet}) {
    margin-top: 20px;
  }
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
    background-color: ${(props) => props.theme.colors.secondary};
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
  background-color: ${(props) => props.theme.colors.secondary};
  color: #fff;
  border-radius: 4px;
  margin-left: 14px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  border: 3px solid #fff;
`;

