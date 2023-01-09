import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { IconNames } from "components";

interface Props {
  isSelected?: boolean;
  icon: IconNames;
  label: string;
  onClick?: (label: string) => void;
}

const TechnologyBox = ({ isSelected = false, icon, label, onClick }: Props) => {
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const onSelect = () => {
    setSelected(!selected);
    onClick && onClick(label);
  };

  return (
    <Container selected={selected} onClick={onSelect}>
      <Icon src={icon} width={40} height={40} />
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
  cursor: pointer;
  height: 74px;
  border: ${(props) =>
    props.selected ? `1px solid ${props.theme.colors.primary}` : 0};

  @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 100%;
    margin-bottom: 8px;
  }
`;

const Icon = styled.img`
  margin: 0px 16px 0px;
  cursor: pointer;
`;

const Label = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
`;

export default TechnologyBox;
