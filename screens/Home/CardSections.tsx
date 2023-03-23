import { FC, PropsWithChildren } from 'react';
import ErrorComponent from '../../components/ErrorComponent';
import LoadingContainer from '../../components/LoadingContainer';
interface Propstype extends PropsWithChildren {
    isLoading: boolean;
    error?: string;
}

const CardSection: FC<Propstype> = ({ children, isLoading, error }) => {
    return (
        <LoadingContainer isLoading={isLoading}>
            <ErrorComponent error={error} />
            {children}
        </LoadingContainer>
    );
};

export default CardSection;
