import { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import useColor from '../../hooks/useColors';

interface propsType {
    size?: 'small' | 'large';
    color?: 'string';
}
const Spinner: FC = ({ size, color }: propsType) => {
    const { colors } = useColor();

    return (
        <ActivityIndicator
            size={size ?? 'small'}
            color={color ?? colors.hover}
        />
    );
};

export default Spinner;
