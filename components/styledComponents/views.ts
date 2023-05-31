import styled from 'styled-components/native';
import { GeneralProps } from '../../interfaces/styles';
import { addStyles } from '../../utils/styled';

export interface ContainerProps extends GeneralProps {
    alignItems: string;
    justifyContent: string;
    direction: string;
    border: string;
    flex: number;
}

type ContainerType = Partial<ContainerProps>;

export const View = styled.View<ContainerType>`
    display: flex;
    background-color: ${(props: any) => props.theme.bg};
    ${(props: any) => addStyles(props)}
`;

export const SafeAreaView = styled.SafeAreaView<ContainerType>`
    background-color: ${(props: any) => props.theme.bg};
    ${(props: any) => addStyles(props)}
`;

export const ScrollView = styled.ScrollView<ContainerType>`
    background-color: ${(props: any) => props.theme.bg};
    ${(props: any) => addStyles(props)}
`;
