import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function () {
    const [token, setToken] = useState('');
    const getToken = async () => await AsyncStorage.getItem('session');

    useEffect(() => {
        getToken().then((tokens) => {
            if (tokens) setToken(tokens);
        });
    }, []);

    return { token };
}
