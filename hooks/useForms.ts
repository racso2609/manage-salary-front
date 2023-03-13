import { useEffect, useState } from 'react';

interface propsType {
    type: string;
    default?: string;
}

export default function useForms(props: propsType) {
    const { type } = props;
    const [defaultValue, setDefaultValue] = useState<string>(
        props.default || ''
    );

    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(
        type === 'password'
    );

    useEffect(() => {
        setDefaultValue(props?.default || '');
    }, [props.default]);

    const onChangeText = (text: string) => setDefaultValue(text);
    const toggleSecureText = () => setSecureTextEntry((prev) => !prev);
    return {
        defaultValue,
        onChangeText,
        type,
        secureTextEntry,
        toggleSecureText,
    };
}
