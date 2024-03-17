import styled from 'styled-components/native'

export const Button = styled.TouchableOpacity`
    display: flex;
    width: 120px;
    height: 35px ;
    border-radius: 20px;
    margin-top: 15px;
    align-items: center;
    flex-direction: colum;
    justify-content: center;

    background-color: ${(props) => (props.primary ? '#3730A3' : '#fff')};
    color: #fff; 

    border: none;
    cursor: pointer;

`