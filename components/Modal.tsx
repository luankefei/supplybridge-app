import React from "react";
import Popup from "reactjs-popup";
import { PopupProps } from "reactjs-popup/dist/types";
import styled from "styled-components";

interface Props extends PopupProps {
  open: boolean;
  children: JSX.Element | JSX.Element[];
  title: string;
  titleAlignment?: string;
  loading?: boolean;
  fullCustomModal?: boolean;
}

export const Modal = ({
  children,
  open,
  title,
  titleAlignment,
  loading,
  fullCustomModal,
  ...rest
}: Props) => (
  <Popup
    {...rest}
    modal={true}
    open={open}
    lockScroll={true}
    overlayStyle={{
      backgroundColor: "rgba(196, 196, 196, 0.7)",
    }}
    contentStyle={{
      width: "calc(40%)",
    }}
  >
    <Container fullCustomModal={fullCustomModal}>
      {(!loading || !fullCustomModal) && (
        <ModalHeader
          alignment={titleAlignment}
          className="header"
          fullCustomModal={fullCustomModal}
        >
          {title}
        </ModalHeader>
      )}

      <Content fullCustomModal={fullCustomModal} className="content">
        {children}
      </Content>
    </Container>
  </Popup>
);

const Container = styled.div<{ fullCustomModal?: boolean }>`
  font-size: 12px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: ${(props) => (props.fullCustomModal ? "0px" : "inherit")};
  border-radius: 8px;
  padding: ${(props) => (props.fullCustomModal ? "0px" : "20px")};
`;
const ModalHeader = styled.div<{
  alignment?: string;
  fullCustomModal?: boolean;
}>`
  width: 100%;
  font-size: 18px;
  text-align: ${(props) => (props.alignment ? props.alignment : "center")};
  padding: 5px;
  color: #8b8c99;
  margin-bottom: 30px;
  display: ${(props) => (props.fullCustomModal ? "none" : "block")};
`;

const Content = styled.div<{ fullCustomModal?: boolean }>`
  width: 100%;
  padding: ${(props) => (props.fullCustomModal ? "0px" : "10px 5px")};
`;
