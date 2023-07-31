import styled from "styled-components";

/**
 * Header text
 * font-family: Ubuntu;
 *
 * font-style: normal;
 *
 * font-weight: 500;
 *
 * font-size: 1.25rem;
 *
 * line-height: 2rem;
 *
 * color: #445B66;
 */
export const HeaderText = styled.div`
  display: inline-block;
  font-family: "Ubuntu";
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2rem;
  color: #445b66;
`;

/**
 * Title text
 * font-family: Ubuntu;
 *
 * font-style: normal;
 *
 * font-weight: 500;
 *
 * font-size: 20px;
 *
 * line-height: normal;
 *
 * color: #1A1A1A;
 */
export const TitleText = styled.div`
  display: inline-block;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: normal;
  color: #445b66;
`;

/**
 * Large text
 * font-family: Ubuntu;
 * font-style: normal;
 * font-weight: 500;
 * font-size: 24px;
 * line-height: 2rem;
 * color: #1A1A1A;
 */
export const LargeText = styled.div`
  display: inline-block;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 2rem;
  color: #1a1a1a;
`;

export const ColoredText = styled.span<{
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}>`
  display: inline-block;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || "500"};
  font-size: ${(props) => props.fontSize || "24px"};
  line-height: 2rem;
  color: ${(props) => props.color || "#445B66"};
`;

/**
 * Medium text
 * font-family: Ubuntu;
 *
 * font-style: normal;
 *
 * font-weight: 500;
 *
 * font-size: 20px;
 *
 * line-height: 2rem;
 *
 * color: #1A1A1A;
 */
export const SText = styled.div<{
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  lineHeight?: string;
}>`
  display: inline-block;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || "500"};
  font-size: ${(props) => props.fontSize || "12px"};
  text-align: ${(props) => props.textAlign || "left"};
  line-height: ${(props) => props.lineHeight || "2rem"};
  color: ${(props) => props.color || "#1a1a1a"};
`;
