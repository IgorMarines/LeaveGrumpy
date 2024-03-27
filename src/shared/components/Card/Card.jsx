
import styled from "styled-components/native";
import { Button } from "../Button/Button";

import { Text } from "../Text/Text";

import { palette } from "../../colors/palette";
import { View } from "react-native";

export const Card = ({ title, frase, saveScreen, saveItem, deleteScreen, deleteItem, share }) => {

  return (
    <StyledCard>
      <TextTitle>{title}</TextTitle>
      <TextCard>{frase}</TextCard>
      <Button primary onPress={share}>
        <Text>Compartilhar</Text>
      </Button>
      <View style={{ display: 'flex' }}>
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



      </View>

    </StyledCard>
  );
};

export const StyledCard = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  

  background-color: ${palette.blue_primary};
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
  color: white;
  font-size: 32px;
  padding: 15px;
  border-radius: 5px;
`;
