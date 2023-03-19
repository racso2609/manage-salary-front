import styled from 'styled-components/native';
import { GeneralProps } from '../../interfaces/styles';
import { addStyles } from '../../utils/styled';

type TextInputProps = GeneralProps;
export const TextInput = styled.TextInput.attrs((props: any) => {
    return { placeholderTextColor: props.theme.ph || 'gray' };
})<TextInputProps>`
    color: ${(props: any) => props.theme.fg};
    ${(props: any) => addStyles(props)};
`;
