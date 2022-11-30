import { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import cookie from "js-cookie";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from 'next/link';

import { request } from "utils/request";
import { Icon, Box, TextField, Button } from "components";
import { emailPattern } from "utils/validator";

interface State {
  email: string;
  password: string;
}

export default function Login() {
  const { push } = useRouter();
  const { handleSubmit, control, formState } = useForm({
    mode: "onChange",
  });
  const { isValid } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (postData: State | any) => {
    try {
      setLoading(true);
      const { data } = await request("login", "POST", postData);
      setLoading(false);
      if (data.id) {
        cookie.set("token", data.token, { expires: 1 / 24})
        toast.success('Success', {
          position: toast.POSITION.TOP_RIGHT,
        });
        push('/dashboard')
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" && isValid) {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Container>
      <InnerContainer>
      <Head>
        <title>Login | Supply Bridge</title>
        <meta name="description" content="Login page of the Supply Bridge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/">
        <Icon src="logo" width={350} height={40} m={'0px 0px 24px'} hover />
      </Link>
      <Box>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true, pattern: emailPattern }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextField
              id="email-input"
              variant="filled"
              data-testid="email"
              label="Email"
              type="email"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
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
            <TextField
              id="filled-basic"
              variant="filled"
              data-testid="password"
              label="Password"
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
      </Box>
      <Button
        disabled={!isValid || loading}
        loading={loading}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Sign In
      </Button>
      <Label>Supply Bridge © Copyright {new Date().getFullYear()}</Label>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  height: 100vh;
  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    padding: 0px 20px;
  }
`;

const InnerContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  max-width: 400px;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Label = styled.span `
  color: #6c757d;
  margin-top: 48px;
  font-size: 16px;
`
