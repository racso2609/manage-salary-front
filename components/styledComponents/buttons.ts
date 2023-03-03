import styled from 'styled-components/native';
import { GeneralProps } from '../../interfaces/styles';
import { addStyles } from '../../utils/styled';

type ButtonProps = GeneralProps;

export const Button = styled.Button<Partial<ButtonProps>>`
    all: unset;
    cursor: pointer;
    padding: 5px 30px;
    border-radius: 20px;
    background-color: blue;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${(props: any) => props.theme.fg};
    ${(props: any) => addStyles(props)};
`;
export const TouchableOpacity = styled.TouchableOpacity<Partial<ButtonProps>>`
    all: unset;
    cursor: pointer;
    padding: 5px 30px;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${(props: any) => props.theme.fg};
    ${(props: any) => addStyles(props)};
`;
