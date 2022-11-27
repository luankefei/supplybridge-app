import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";

import { Header } from "./Header";
import { Icon, IconNames } from "./Icon";
import { TextField } from "./TextField";

interface Props {
  isSelected?: boolean;
  icon: IconNames;
  label: string;
  onClick?: (label: string) => void;
}

export const TechnologyBox = ({
  isSelected = false,
  icon,
  label,
  onClick,
}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  useEffect(() => {
    if (isSelected) {
      setSelected(true);
    }
  }, []);

  const onSelect = () => {
    setSelected(!selected);
    onClick && onClick(label);
  };

  return (
    <Container selected={selected} onClick={onSelect}>
      <Icon src={icon} width={40} height={40} m={"0px 16px 0px "} />
      <Label>{label}</Label>
    </Container>
  );
};

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 15px 18px;
  background: #fafafa;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  width: 16%;
  align-items: center;
  margin-right: 32px;
  min-width: 242px;
  height: 74px;
  border: ${(props) => (props.selected ? "1px solid #08979c" : 0)};
`;

const Label = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;
