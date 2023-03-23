import { FC } from 'react';
import { Text } from '../styledComponents';
interface propsTypes {
    error?: string;
}

const ErrorComponent: FC<propsTypes> = ({ error }) => {
    return <>{error && <Text>{error}</Text>}</>;
};

export default ErrorComponent;
