import styled from "@emotion/styled";

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
 * font-size: 12px;
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

export const STextH1 = styled.span<{
  color?: string;
}>`
  color: ${(props) => props.color || "#434343"};
  text-align: center;
  font-family: Ubuntu;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const STextH2 = styled.span<{
  textAlign?: string;
  color?: string;
}>`
  color: ${(props) => props.color || "#434343"};
  text-align: ${(props) => props.textAlign || "center"};
  font-family: Ubuntu;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const STextH3 = styled.span<{
  color?: string;
}>`
  color: ${(props) => props.color || "#434343"};
  text-align: center;
  font-family: Ubuntu;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const STextH4 = styled.span<{
  color?: string;
}>`
  color: ${(props) => props.color || "#434343"};
  text-align: center;
  font-family: Ubuntu;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const STextCaption = styled.span<{
  color?: string;
  textAlign?: string;
}>`
  color: ${(props) => props.color || "#434343"};
  text-align: ${(props) => props.textAlign || "center"};
  font-family: Ubuntu;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

export const STextBody = styled.span<{
  color?: string;
  textAlign?: string;
  fontSize?: string;
}>`
  color: ${(props) => props.color || "#9CA3AF"};
  text-align: ${(props) => props.textAlign || "center"};

  font-family: Ubuntu;
  font-size: ${(props) => props.fontSize || "14px"};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

/**
 * @deprecated use STextBody instead
 */
export const STextBody16 = styled.span<{
  color?: string;
  textAlign?: string;
}>`
  color: ${(props) => props.color || "#434343"};
  text-align: ${(props) => props.textAlign || "center"};
  font-family: Ubuntu;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

export const STextSecondary = styled.span<{
  size?: string;
}>`
  color: #9ca3af;
  text-align: center;
  font-family: Ubuntu;
  font-size: ${(props) => props.size || "14px"};
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: ${(props) => props.size || "8px"};
  }
`;
