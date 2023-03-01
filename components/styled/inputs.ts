import styled from 'styled-components/native';
import { GeneralProps } from '../../interfaces/styles';
import { addStyles } from '../../utils/styled';

type TextInputProps = GeneralProps;
export const TextInput = styled.TextInput<TextInputProps>`
    ${(props: any) => addStyles(props)};
`;
