import styled from 'styled-components/native';
import { addStyles } from '../../utils/styled';

export interface TextProps {
    color: string;
    fontSize: string;
    weight: string;
}
export const Text = styled.Text<Partial<TextProps>>`
    color: ${(props: any) => props.theme.fg};
    ${(props: any) => addStyles(props)};
`;
