import styled from 'styled-components/native'
import { palette } from '../../colors/palette'

export const Button = styled.TouchableOpacity`
    display: flex;
    width: 120px;
    height: 35px ;
    border-radius: 5px;
    margin-top: 15px;
    align-items: center;
    flex-direction: colum;
    justify-content: center;

    background-color: ${(props) => (props.primary ? palette.blue_secondary : '#fff')};
    color: #fff; 

    border: none;
    cursor: pointer;

`