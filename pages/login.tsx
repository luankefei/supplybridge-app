import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Head from "next/head";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import dynamic from "next/dynamic";

import { emailPattern } from "utils/validator";
import { useAuth } from "requests/useAuth";

import Introduction from "components/introduction";
import TermsPrivacyFooter from "components/termsPrivacyFooter";
import Icon from "components/icon";
import TextField from "components/textField";
const Box = dynamic(() => import("components/box"));
const Button = dynamic(() => import("components/button"));

interface State {
  email: string;
  password: string;
}

const emailLoginSuffix = ["bmw.de", "bmw.com", "bmwgroup.com"];

export default function Login() {
  const { login, loading, sendVerificationEmail } = useAuth();
  const { handleSubmit, control, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [enableEmailLogin, setEnableEmailLogin] = useState(false);
  const [isEmailButtonOk, setIsEmailButtonOk] = useState(true);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (postData: State | any) => {
    await login(postData);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" && isValid) {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit(onSubmit)();
    }
  };

  const onEmailChange = useCallback(
    (evt: any) => {
      const email0 = evt.target.value;
      if (!email0) return;
      const suffix = email0.split("@")[1];
      if (!suffix) return;
      if (emailLoginSuffix.includes(suffix)) {
        if (!enableEmailLogin) {
          setEnableEmailLogin(true);
          window.localStorage.setItem("emaillogin", email0);
        }
      } else {
        if (enableEmailLogin) setEnableEmailLogin(false);
      }
    },
    [enableEmailLogin, setEnableEmailLogin]
  );

  useEffect(() => {
    const t = setInterval(() => {
      if (!enableEmailLogin) return;
      const ts = new Date().getTime();
      const lastTs = new Date(
        parseInt(window.localStorage.getItem("emailloginint") || "0")
      ).getTime();
      if (ts - lastTs < 1000 * 60) {
        if (isEmailButtonOk) setIsEmailButtonOk(false);
      } else {
        if (!isEmailButtonOk) setIsEmailButtonOk(true);
      }
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, [enableEmailLogin, isEmailButtonOk, setIsEmailButtonOk]);

  return (
    <BackgroundContainer>
      <Container>
        <InnerContainer>
          <FormContainer>
            <Head>
              <title>Login | Supply Bridge</title>
              <meta
                name="description"
                content="Login page of the Supply Bridge"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <Link href="/">
              <Icon
                src="logo"
                width={350}
                height={40}
                m={"0px 0px 24px"}
                hover
              />
            </Link>
            <Box>
              <FormTitle>
                Experience our
                <br />
                Next-Generation platform
              </FormTitle>
              <Label>Email</Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: emailPattern }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <TextFieldForLogin
                    id="email-input"
                    variant="filled"
                    data-testid="email"
                    type="email"
                    value={value}
                    onChange={(evt: any) => {
                      onEmailChange(evt);
                      onChange(evt);
                    }}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
              {enableEmailLogin ? null : (
                <>
                  <Label>Password</Label>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      },
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <TextFieldForLogin
                        id="filled-basic"
                        variant="filled"
                        data-testid="password"
                        value={value}
                        type={showPassword ? "email" : "password"}
                        onChange={onChange}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        error={!!error}
                        helperText={error ? error.message : null}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={showPasswordHandler}
                            >
                              {showPassword ? (
                                <Icon src="show-eye" hover={true} />
                              ) : (
                                <Icon src="hide-eye" hover={true} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                </>
              )}
            </Box>
            <div className="check-row">
              <div className="radio-input">
                <input type="checkbox" id="radio" name="radio" />
                <label htmlFor="radio" className="remember-me">
                  Remember me
                </label>
              </div>
              <div className="forgot-text">
                <Link href="#">forget password?</Link>
              </div>
            </div>
            {enableEmailLogin ? (
              <Button
                disabled={!isEmailButtonOk || loading}
                onClick={sendVerificationEmail}
              >
                Email Verify to Login
              </Button>
            ) : (
              <Button
                disabled={!isValid || loading}
                loading={loading}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
            )}
          </FormContainer>
          <TermsPrivacyFooter />
        </InnerContainer>
      </Container>
      <Introduction />
    </BackgroundContainer>
  );
}

const BackgroundContainer = styled.div`
  background-image: url("/images/loginbk.svg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;

const Container = styled.div`
  height: 100vh;
`;

const InnerContainer = styled.div`
  background-color: white;
  padding: 6% 6% 1% 6%;
  width: 520px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    height: 100vh;
    width: 100vw;
  }

  .check-row {
    width: 100%;
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .radio-input {
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  .remember-me {
    margin-bottom: -2px;
    margin-left: 5px;
  }
  .forgot-text a {
    text-decoration: none;
    color: #08979c;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: 600;
  }
  #radio {
    width: min-content;
  }
  a {
    text-decoration: none;
    color: #08979c;
    margin: 0 2px;
    font-weight: 600;
  }
`;

const Label = styled.span`
  color: #6c757d;
  margin-top: 48px;
  font-size: 16px;
`;

const FormContainer = styled.div`
  flex: 1 0 auto;
  margin-top: 25%;
  > a > img {
    margin-left: -16px;
  }
`;

const FormTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: -5px;
  margin-bottom: 35px;

  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    font-size: 20px;
  }
`;

const TextFieldForLogin = styled(TextField)`
  & {
    margin: 5px 0;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background-color: #f9fafb;
  }
  &&.Mui-focused {
    background-color: #f9fafb;
    border: 2px solid #08979c;
  }
  && .MuiFilledInput-root {
    height: 56px;
    border-radius: 8px;
    background-color: #f9fafb;
  }
  && .MuiFilledInput-root:hover {
    border: 1px #08979c solid;
  }
  & .MuiFilledInput-input {
    padding: 0 0 0 15px;
  }
`;
