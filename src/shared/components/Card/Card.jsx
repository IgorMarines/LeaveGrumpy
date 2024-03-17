
import styled from "styled-components/native";
import { Button } from "../Button/Button";

import { Text } from "../Text/Text";

export const Card = ({ title, frase, saveScreen, saveItem, deleteScreen, deleteItem }) => {

  return (
    <StyledCard>
      <TextTitle>{title}</TextTitle>
      <TextCard>{frase}</TextCard>
      {saveScreen && (
        <Button primary onPress={saveItem}>
          <Text>Salvar</Text>
        </Button>
      )}
      {deleteScreen && (
        <Button primary onPress={deleteItem}>
          <Text>Deletar</Text>
        </Button>
      )}

    </StyledCard>
  );
};

export const StyledCard = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  

  background-color: ${(color) => color.primary ? '#4F46E5' : color.secondary ? '#F72585' : '#5552CA'};
  shadow-color: #000;

  width: 300px;
  padding: 30px;

  border-radius: 10px;

  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  z-index: 1;
`;

export const TextCard = styled.Text`
  color: #fff;
  font-size: 14px;
  margin-top: 20px;
`;

export const TextTitle = styled.Text`
  color: #fff;
  font-size: 32px;

`;
