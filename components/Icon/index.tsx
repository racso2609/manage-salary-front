import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
interface propsType {
    icon: IconDefinition;
}

const Icon: FC<propsType> = ({ icon }) => {
    return <FontAwesomeIcon icon={icon} />;
};

export default Icon;
