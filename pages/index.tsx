import { Button, Icon } from "components";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Home Page | Supply Bridge</title>
        <meta name="description" content="Home page of the Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Icon src="logo" width={350} height={40} />
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
          <Link href="/login">
            <Button secondary={true} >Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </Buttons>
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
          <SlideImage
            src="/images/slide-img.svg"
            alt="slide_img"
            width="auto"
            height="100%"
          ></SlideImage>
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
          <SupplierImage
            src="/images/become-a-supplier.png"
            alt="become_a_supplier"
            width="auto"
            height="100%"
          />
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
          <span>
            <ContactContainerInput />
            <ContactContainerInput />
            <ContactContainerInput />
          </span>
          <span>
            <ContactContainerMessageInput />
            <Button>Submit</Button>
          </span>
        </ContactContainerLeft>
        <ContactContainerRight>
          <ContactContainerBackground
            src="/images/contact-bg.png"
            alt="contact_bg"
            width="auto"
            height="330px"
          />
          <ContactContainerImage
            src="/images/contact-img.png"
            alt="contact_img"
            width="100%"
            height="100%"
          />
        </ContactContainerRight>
      </ContactContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  margin: 0 20px 0 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #1a1a1a;
  background-color: ${(props) => props.theme.colors.white}
`;

// HEADER
const Header = styled.div`
  width: 100%;
  height: 93px;
  padding: 0 60px 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavContainer = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.size.laptop}) { // FIXME
    display: none;
  }
`;

const NavTitle = styled.div`
  margin-right: 48px;
`;

const Buttons = styled.div`
  display: inline-flex;
  gap: 12px;

`;

const SlideContainer = styled.div`
  background-image: url(/images/slide.jpg);
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.6);
  display: flex;
  height: 50%;
`;

const Gap = styled.div<{gap: number}>`
  width: ${(props)=> `${props.gap}px`}
`

// Slide Container
const SlideTextContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-end;
`;

const SlideText = styled.h1`
  color: #fff;
  font-style: normal;
  font-weight: 500;
  font-size: 63px;
  line-height: 72px;
  display: inline-block;
  margin-left: 83px;
  margin-bottom: 70px;
`;

const SlideImageContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const SlideImage = styled.img`
  object-fit: contain;
  height: 95%;
  padding: 40px 0 40px 0;
`;

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
  /* width: 60%; */
  margin-left: 100px;
`;

const SupplierImage = styled.img`
  height: 500px;
  filter: grayscale(100%);
`;

//Video Container
const VideoContainer = styled.div`
  background-image: url(/images/video-img.jpg);
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.4);
  display: flex;
  height: 700px;
  position: relative;
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
  color: #ffffff;
  margin: 0;
`;

const VideoText = styled.h4`
  font-style: normal;
  font-weight: 300;
  font-size: 19.5px;
  line-height: 22px;
  color: #ffffff;
  margin-top: 30px;
`;

const VideoPlayIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  &:hover {
  }
`;

// Platform Container
const PlatformContainer = styled.div`
  padding: 0 160px 0 160px;
  margin: 150px 0 150px 0;
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
  background-color: #cce4ec;
  height: 432px;
  margin: 0 105px 0 105px;
  border-radius: 20px;
  display: flex;
`;

const ContactContainerLeft = styled.div`
  width: 532px;
  display: flex;
  flex-direction: column;
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

const ContactContainerInput = styled.input`
  border: 0.75px solid #000000;
  width: 255px;
  height: 43;
  padding: 10px;
`;

const ContactContainerMessageInput = styled.input`
  border: 0.75px solid #000000;
  width: 255px;
`;

const ContactContainerRight = styled.div``;

const ContactContainerBackground = styled.img`
  opacity: 0.04;
`;

const ContactContainerImage = styled.img``;
