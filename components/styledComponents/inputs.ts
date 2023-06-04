import styled from 'styled-components/native';
import { GeneralProps } from '../../interfaces/styles';
import { addStyles } from '../../utils/styled';

type TextInputProps = GeneralProps;
interface SwitchProps {
    isEnabled: boolean;
    activeColor: string;
    inactiveColor: string;
    thumbColor: string;
}
export const TextInput = styled.TextInput.attrs((props: any) => {
    return { placeholderTextColor: props.theme.ph || 'gray' };
})<Parial<TextInputProps>>`
    color: ${(props: any) => props.theme.fg};
    ${(props: any) => addStyles(props)};
`;

export const Switch = styled.Switch.attrs((props: any) => {
    const activeColor = props.activeColor ?? props.theme.hover;
    const inactiveColor = props.inactiveColor ?? props.theme.inactive;
    const thumbColor = props.thumbColor ?? props.hover;

    return {
        trackColor: {
            false: inactiveColor,
            true: activeColor,
        },
        thumbColor: thumbColor,
    };
})<Partial<SwitchProps>>``;
