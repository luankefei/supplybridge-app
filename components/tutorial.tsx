import { useEffect, useState } from "react";
import styled from "styled-components"

interface Props {
  storageKey: string;
}

export default function Tutorial({ storageKey }: Props) {
  const [showTutorial, setShowTutorial] = useState(true)

  useEffect(() => {
    setStorage()
  }, [])

  const setStorage = () => {
    const tutorial = localStorage.getItem(storageKey)
    if (tutorial) {
      setShowTutorial(JSON.parse(tutorial))
    } else {
      setShowTutorial(false)
    }
  }

  const tutorialHandler = () => {
    localStorage.setItem(storageKey, "true")
    setStorage()
  }


  return (
    <>
      {!showTutorial &&
        <Container onClick={tutorialHandler}>
          <Background>

          </Background>
          <Content>
            <div></div>
            <Middle>
              <Left>
                <SubTitle>Previous page</SubTitle>
                <LeftArrow src="/tutorial/tutorial-left-arrow.svg" />
              </Left>
              <Text>
                <Loading src="/tutorial/tutorial-loading.svg" />
                <Title>COMING SOON</Title>
                <SubTitle>here’s a sneak peek</SubTitle>

              </Text>
              <Right>
                <SubTitle>Next page</SubTitle>
                <RightArrow src="/tutorial/tutorial-right-arrow.svg" />
              </Right>
            </Middle>
            <Circle width={300} src="/tutorial/tutorial-circle.svg" />
          </Content>
        </Container>
      }
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
`;

const Background = styled.div`
  background-color: #1A1A1A;
  opacity: 0.8;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Content = styled.div`
  width: 1068px;
  height: 730px;
  color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Middle = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div``;

const Text = styled.div`
margin-bottom: 100px;
display: flex;
flex-direction: column;
align-items: center;
`;

const Right = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
margin-right: -10px;
`

const Title = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 34px;
  margin-top: 20px;
`;

const SubTitle = styled.div`
  font-family: 'Itim';
  font-weight: 200;
  font-size: 34px;
  letter-spacing: 1.3px;
`;

const Loading = styled.img``;

const LeftArrow = styled.img`
  margin-top: -20px;
  width: 120px;
`;

const RightArrow = styled.img`
  margin-top: -20px;
  margin-right: -15px;
  width: 120px;
`;

const Circle = styled.img`
  justify-self: flex-end;
  margin-bottom: -80px;
  margin-right: 15px;
`;