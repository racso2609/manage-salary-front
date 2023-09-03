import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { childrenProps } from '../../types';
import Icon from '../Icon';
import { TextInput, View } from '../styledComponents';

interface propsTypes extends childrenProps {
    show: boolean;
    internalValue: {
        defaultValue: string;
        onChangeText: (a: string) => void;
    };
}
const SelectInput: FC<propsTypes> = ({ internalValue, children, show }) => {
    const [isFocus, setFocus] = useState(false);
    const onFocus = () => {
        setFocus(true);
    };
    const onBlur = () => {
        setFocus(false);
    };
    const onHandleClick = () => {
        setFocus((prev) => !prev);
    };

    const showPanel = isFocus && show;

    return (
        <View style={styles.container}>
            <TextInput onFocus={onFocus} onBlur={onBlur} {...internalValue} />
            {showPanel && <View style={styles.list}>{children}</View>}
            {isFocus ? (
                <Icon
                    icon={faArrowUp}
                    style={styles.icon}
                    onPress={onHandleClick}
                />
            ) : (
                <Icon
                    icon={faArrowDown}
                    style={styles.icon}
                    onPress={onHandleClick}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        paddingHorizontal: 5,
        // borderRadius: 5,
        // overflow: 'hidden',
    },
    list: {
        position: 'absolute',
        top: '100%',
        left: -20,
    },
    icon: {
        position: 'absolute',
        right: 2,
    },
});

export default SelectInput;
