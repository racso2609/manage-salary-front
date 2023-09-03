import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from '../styledComponents';
interface propsType {
    icon: IconDefinition;
    onPress?: () => void;
    style?: any;
}

const Icon: FC<propsType> = ({ icon, ...props }) => {
    return (
        <TouchableOpacity
            {...props}
            style={{
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
                paddingBottom: 0,
            }}
        >
            <FontAwesomeIcon icon={icon} />
        </TouchableOpacity>
    );
};

export default Icon;
