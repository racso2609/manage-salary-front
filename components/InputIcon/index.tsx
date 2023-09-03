import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import Icon from '../Icon';
import { TextInput, TouchableOpacity, View } from '../styledComponents';

interface propsTypes extends TextInputProps {
    icon: IconDefinition;
    style?: any;
    onPressIcon?: () => void;
}

const InputIcon: FC<propsTypes> = ({ onPressIcon, style, icon, ...props }) => {
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity
                onPress={onPressIcon}
                style={styles.iconContainer}
            >
                <Icon icon={icon} />
            </TouchableOpacity>
            <TextInput style={{ flexGrow: 0.9 }} {...props} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
        // borderStyle: 'solid',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexGrow: 0.1,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
});

export default InputIcon;
