import React, { useContext } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { View, Button } from '../../components/styledComponents';
import useForms from '../../hooks/useForms';
import { AuthContext } from '../../context/auth';
import InputIcon from '../../components/InputIcon';
import {
    faEnvelope,
    faLock,
    faSignature,
    faUnlock,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

export default function Register() {
    const email = useForms({ type: 'email', default: '' });
    const firstName = useForms({ type: 'text', default: '' });
    const lastName = useForms({ type: 'text', default: '' });
    const password = useForms({ type: 'password', default: '' });

    const { register } = useContext(AuthContext);
    const handleSubmit = async () => {
        if (register) {
            await register({
                email: email.defaultValue,
                password: password.defaultValue,
                firstName: firstName.defaultValue,
                lastName: lastName.defaultValue,
            });
        }
    };

    return (
        <View style={[styles.container]}>
            <StatusBar hidden={true} />
            <View style={styles.form}>
                <View style={styles.doubleForm}>
                    <InputIcon
                        {...firstName}
                        placeholder="first name"
                        style={{ flexGrow: 0.5 }}
                        icon={faUser}
                    />

                    <InputIcon
                        {...lastName}
                        placeholder="last name"
                        style={{ flexGrow: 0.5 }}
                        icon={faSignature}
                    />
                </View>
                <InputIcon
                    defaultValue={email.defaultValue}
                    onChangeText={email.onChangeText}
                    placeholder="email"
                    icon={faEnvelope}
                />

                <InputIcon
                    defaultValue={password.defaultValue}
                    onChangeText={password.onChangeText}
                    placeholder="password"
                    secureTextEntry={password.secureTextEntry}
                    icon={password.secureTextEntry ? faLock : faUnlock}
                    onPressIcon={password.toggleSecureText}
                />
                <View style={[styles.button]}>
                    <Button title="Register" onPress={handleSubmit} />
                </View>
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
    doubleForm: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
    },
});
