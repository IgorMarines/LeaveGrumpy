import styled from "styled-components/native";

export const ViewTextsLogin = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const ViewTexts = styled.View`
    margin-top: 20; 
`;

export const TextLogin = styled.Text`
  color: #fff;
  font-size: ${(props) =>
    props.primary
      ? "24px"
      : props.secondary
      ? "14px"
      : props.terciary
      ? "12px"
      : "16px"};
`;
