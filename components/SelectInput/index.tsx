import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { childrenProps } from '../../types';
import { TextInput, View, Text } from '../styledComponents';

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
        <View>
            <TextInput onFocus={onFocus} onBlur={onBlur} {...internalValue} />
            {showPanel && (
                <View>
                    <Text>{children}</Text>
                </View>
            )}
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
