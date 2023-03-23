import { FC, PropsWithChildren } from 'react';
import Spinner from '../Spinner';
interface propsTypes extends PropsWithChildren {
    isLoading: boolean;
}
const LoadingContainer: FC<propsTypes> = ({ isLoading, children }) => {
    return isLoading ? <Spinner /> : children;
};

export default LoadingContainer;
