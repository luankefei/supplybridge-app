import MuiBox from '@mui/material/Box';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  onSubmit?: () => any;
}

const Box = ({ children, onSubmit }: Props) => {
  return (
    <Container
      component="form"
      onSubmit={onSubmit}
      sx={{
        '& .MuiTextField-root': { mb: 1, width: '100%' },
      }}
    >
      {children}
    </Container>
  );
};

const Container = styled(MuiBox)`
  width: 100% !important;
`;

export default Box;