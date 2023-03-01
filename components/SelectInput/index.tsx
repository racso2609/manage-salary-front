import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { childrenProps } from '../../types';
import { TextInput } from '../styledComponents';
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

    const showPanel = isFocus && show;

    return (
        <View style={[styles.container]}>
            <TextInput onFocus={onFocus} onBlur={onBlur} {...internalValue} />
            {showPanel && <View style={[styles.list]}>{children}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 'auto',
    },
    list: {
        // width: "100%",
        // height: "100%",
    },
});

export default SelectInput;
