
import React, { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import useBoundStore from "hooks/useBoundStore";
import { useTranslation } from 'react-i18next';

interface SubmitButtonProps {
  disabled: boolean;
  loading: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function SubmitButton(props: SubmitButtonProps) {

  const { disabled, loading, onClick } = props;

  return (
    <StyledButton disabled={loading || disabled} onClick={onClick}>
      {loading ? <Spinner /> : "Submit"}
    </StyledButton>
  )

}


export default function Feedback() {
  const { t } = useTranslation();

  const [feedback, setFeedback] = useState("");
  const feedbackStore = useBoundStore((props) => props.feedback);
  const { show, setShow } = feedbackStore;
  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: { feedback }
  });
  const watchFeedback = watch("feedback", "");

  const handleClickContainer = (e: any) => {
    e.stopPropagation();
  }

  const handleFeedbackClose = () => {
     setShow(false);
  }

  const handleFeedbackButton = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setShow(!show);
  }

  const onSubmit = (data: any) => {
    // Call the api
    setShow(false);
    setFeedback("");
    reset({ feedback });
  }

  const loading = false;

  return (
    <ContainerWrapper>
      <Mask show={show} onClick={handleFeedbackClose}/>
      <Container className={show ? "shown" : "hidden"} onClick={handleClickContainer}>
        <FeedbackLabelWrapper onClick={handleFeedbackButton}>
          {t("scout.feedback", "FEEDBACK")}
        </FeedbackLabelWrapper>
        <form>
          <ContentWrapper>
            <FeedbackTitle className="subtitle">How can we do better?</FeedbackTitle>
            <Controller
              control={control}
              name="feedback"
              render={({ field }) =>
                <FeedbackTextarea className="text" {...field} placeholder="Type your remarks..." />
              }
            />

            <SubmitButton onClick={handleSubmit(onSubmit)} loading={loading} disabled={!watchFeedback} />
          </ContentWrapper>
        </form>
      </Container>
    </ContainerWrapper>
  );

}

const ContainerWrapper = styled.div`
  .shown {
    right: 0px;
    transition: right 1s ease 0s;
  }

  .hidden {
    right: -495px;
    transition: right 1s ease 0s;
  }
`;

const Mask = styled.div<any>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  opacity: 0.3;
  z-index: 3000;
  display: ${(props) => props.show ? 'block' : 'none'};
`;

const Container = styled.div`
  position: absolute;
  top: 14px;
  right: -492px;

  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));
  z-index: 3001;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;

  width: 492px;
  height: 404px;

  background: ${(props) => props.theme.colors.background};
  border-radius: 16px;
`;

const FeedbackLabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    width: 6.2rem;
    height: 1.875rem;
    position: relative;
    margin-right: -1.8125rem;
    margin-top: 3.3125rem;
    background: #C41D7F;
    border-radius: 16px 16px 0px 0px;
    transform: rotate(-90deg);

    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.375rem;
    color: #FFFFFF;
    cursor: pointer;
`;

const FeedbackLabel = styled.div`
`;

const FeedbackTitle = styled.div`
  color: #2A3840;
`;


const FeedbackTextarea = styled.textarea`
  width: 444px;
  height: 256px;
  max-width: 444px;
  max-height: 256px;
  padding-top: 30px;
  padding-bottom: 17px;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 8px;

  background: ${(props) => props.theme.colors.surface};
  border-radius: 16px;
  border: unset;
  resize: none;
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.secondary};
  }

  ::placeholder {
    color: ${(props) => props.theme.colors.grey};
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 254px;
  height: 46px;
  margin-top: 24px;
  margin-left: 95px;

  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
  border: unset;

  background: ${(props) => props.disabled ? props.theme.colors.secondaryDisabled : props.theme.colors.secondary};
  border-radius: 1000px;
  color: ${(props) => props.theme.colors.neutaral};
  cursor: ${(props) => props.disabled ? "auto" : "pointer"};
`;

const Spinner = styled.div`
  border: ${(props) => `${props.theme.colors.secondary} 4px solid`};
  border-radius: 50%;
  border-top: ${(props) => `${props.theme.colors.secondaryDisabled} 4px solid`} ;
  height: 23px;
  width: 23px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
