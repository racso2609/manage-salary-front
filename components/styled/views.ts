import styled from 'styled-components/native';
import { GeneralProps } from '../../interfaces/styles';
import { addStyles } from '../../utils/styled';

export interface ContainerProps extends GeneralProps {
    alignItems: string;
    justifyContent: string;
    direction: string;
}

type ContainerType = Partial<ContainerProps>;

export const View = styled.View<ContainerType>`
    display: flex;
    ${(props: any) => addStyles(props)}
`;

export const ScrollView = styled.ScrollView<ContainerType>`
    ${(props: any) => addStyles(props)}
`;
