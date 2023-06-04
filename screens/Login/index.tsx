import React, { useContext } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import {
    View,
    TouchableOpacity,
    Button,
    Text,
    SafeAreaView,
} from '../../components/styledComponents';
import useForms from '../../hooks/useForms';
import { AuthContext } from '../../context/auth';
import { RootStackParamList } from '../../navigation/UnLoggedStack';
import { StackScreenProps } from '@react-navigation/stack';
import InputIcon from '../../components/InputIcon';
import useToggle from '../../hooks/useToggle';
import {
    faEnvelope,
    faLock,
    faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { Switch } from '../../components/styledComponents/inputs';

type PropsType = StackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: PropsType) {
    const email = useForms({ type: 'email', default: '' });
    const password = useForms({ type: 'password', default: '' });
    const keepLogged = useToggle();
    const { login } = useContext(AuthContext);
    const handleSubmit = () => {
        if (login)
            login({
                email: email.defaultValue,
                password: password.defaultValue,
                keepLogged: keepLogged.isActive,
            });
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar hidden={true} />
            <View style={styles.form}>
                <InputIcon
                    defaultValue={email.defaultValue}
                    onChangeText={email.onChangeText}
                    placeholder="email"
                    icon={faEnvelope}
                    autoCapitalize="none"
                    autoComplete="email"
                />

                <InputIcon
                    defaultValue={password.defaultValue}
                    autoCapitalize="none"
                    autoComplete="password"
                    onChangeText={password.onChangeText}
                    placeholder="password"
                    secureTextEntry={password.secureTextEntry}
                    icon={password.secureTextEntry ? faLock : faUnlock}
                    onPressIcon={password.toggleSecureText}
                />

                <View style={styles.keepLogged}>
                    <Text>Keep me logged</Text>
                    <Switch
                        onValueChange={keepLogged.toggle}
                        value={keepLogged.isActive}
                    />
                </View>

                <Button title="Login" onPress={handleSubmit} />

                <TouchableOpacity
                    onPress={handleRegister}
                    style={{ marginVertical: 10, color: 'red' }}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
    keepLogged: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
