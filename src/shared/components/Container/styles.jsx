import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

const getDarkTheme = AsyncStorage.getItem('darkTheme');


export const ViewContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background: ${(darkMode) => getDarkTheme ? '#4F46E5' : '#000'};
    align-items: ${(alignItems) => alignItems.centered ? 'center' : ''};
    justify-content: ${(justifyContent) => justifyContent.centered ? 'center' : ''};
    
`