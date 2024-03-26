import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import {palette} from '../../../shared/colors/palette';

const getDarkTheme = AsyncStorage.getItem('darkTheme');


export const ViewContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background: ${palette.blue_tertiary};
    align-items: ${(alignItems) => alignItems.centered ? 'center' : ''};
    justify-content: ${(justifyContent) => justifyContent.centered ? 'center' : ''};
    
`