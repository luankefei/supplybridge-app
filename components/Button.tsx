import React from 'react';
import styled from 'styled-components';
import { ButtonUnstyledProps, useButton } from '@mui/base/ButtonUnstyled';
import CircularProgress from '@mui/material/CircularProgress';
import { styled as muiStyled } from '@mui/system';
import clsx from 'clsx';
import { theme } from 'config/theme';

import Icon from 'components/Icon'

const CustomCircularProgress = muiStyled(CircularProgress)`
  margin-left: 10px;
  position: absolute;
  right: 50px;
  margin-top: 3px;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  padding-top: 1px;
`;

const CustomButtonRoot = styled<ButtonUnstyledProps | any>('button')`
  display: flex;
  justify-content: center;
  position: relative;
  background-color: ${(props) => (props.secondary ? theme.colors.white : theme.colors.primary)};
  width: ${(props) => (props?.block ? '100%' : '250px')};
  padding: 15px;
  border-radius: 4px;
  color: ${(props) => (props.secondary ? theme.colors.black : theme.colors.white)};
  border-color: transparent;
  font-weight: 400;
  font-family: 'Ubuntu', sans-serif !important;
  font-size: 18px;
  transition: all 200ms ease;
  cursor: pointer;
  border: ${(props) => (props.secondary ? `1px solid #CCE4EC !important` : `1px solid ${theme.colors.primary} !important`)};
  margin-bottom: 10px;
  margin: ${(props) => props.margin ? props.margin : 0};

  &:hover {
    // background-color: #0059b2;
    opacity: 0.8;
  }

  &.active {
    // background-color: #004386;
  }

  &.focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.disabled {
    background-color: #dadada;
    opacity: 0.8;
    cursor: unset;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
    color: #9fa6ac;
    border: 1px solid #dedede !important;
  }
`;

const Button = React.forwardRef(function CustomButton(
  props: ButtonUnstyledProps | any,
  ref: React.ForwardedRef<any>,
) {
  const { children, loading, color = theme.colors.primary, block = true, secondary = false, icon = false, margin = 0 } = props;
  const { active, disabled, focusVisible, getRootProps } = useButton({
    ...props,
    ref,
    component: CustomButtonRoot,
  });

  const classes = {
    active,
    disabled,
    focusVisible,
  };

  return (
    <CustomButtonRoot
      {...getRootProps()}
      className={clsx(classes)}
      type="submit"
      data-testid="submit"
      color={color}
      block={block}
      margin={margin}
      secondary={secondary}
    >
      {icon && (
        <IconContainer>
          <Icon width={18} height={18} src={icon} />
        </IconContainer>
      )}
      {children}
      {loading && <CustomCircularProgress size={20} color={'inherit'} />}
    </CustomButtonRoot>
  );
});

export default Button;