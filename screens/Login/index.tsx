import React, { useContext } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import {
    View,
    TextInput,
    TouchableOpacity,
    Button,
    Text,
} from '../../components/styledComponents';
import useForms from '../../hooks/useForms';
import { AuthContext } from '../../context/auth';
import { RootStackParamList } from '../../navigation/UnLoggedStack';
import { StackScreenProps } from '@react-navigation/stack';

type PropsType = StackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: PropsType) {
    const email = useForms({ type: 'email', default: '' });
    const password = useForms({ type: 'password', default: '' });
    const { login } = useContext(AuthContext);
    const handleSubmit = () => {
        if (login)
            login({
                email: email.defaultValue,
                password: password.defaultValue,
            });
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={[styles.container]}>
            <StatusBar hidden={true} />
            <View style={styles.form}>
                <TextInput
                    defaultValue={email.defaultValue}
                    onChangeText={email.onChangeText}
                    placeholder="email"
                />

                <TextInput
                    defaultValue={password.defaultValue}
                    onChangeText={password.onChangeText}
                    placeholder="password"
                    secureTextEntry={password.secureTextEntry}
                />

                <TouchableOpacity
                    onPress={password.toggleSecureText}
                    style={{ marginBottom: 10 }}
                >
                    <Text>
                        {password?.secureTextEntry ? 'Show ' : 'Hidden '}
                        password
                    </Text>
                </TouchableOpacity>

                <Button title="Login" onPress={handleSubmit} />

                <TouchableOpacity
                    onPress={handleRegister}
                    style={{ marginVertical: 10, color: 'red' }}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    h1: {
        fontSize: 20,
    },
    form: {
        paddingHorizontal: 20,
    },
});
