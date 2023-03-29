import React from "react";
import styled from "styled-components";

import { IconNames } from "components";
import Icon from "components/Icon";

type Props = {
  icon?: IconNames;
  label: string;
  color?: string;
};
const Badge = ({ icon, label, color }: Props) => {
  return (
    <BadgeContainer color={color}>
      {icon && <Icon src={icon} width={20} height={20} hover />}
      <BadgeSpan>{label}</BadgeSpan>
    </BadgeContainer>
  );
};

const BadgeContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 4px;
  height: 32px;
  background-color: ${(props) =>
    props.color ? props.color : props.theme.colors.secondary};
  border-radius: 41px;
`;

const BadgeSpan = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  font-family: "Inter";
  color: ${(props) => props.theme.colors.neutaral};
  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;

export default Badge;
