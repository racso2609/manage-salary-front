import { createContext, useState, useEffect } from 'react';
import { userInterface, childrenProps } from '../types';
import { IRegister, loginDataInterface } from '../interfaces/auth';
import {
    loginRequest,
    currentUserRequest,
    registerRequest,
} from '../requests/auth';
import notify from '../utils/notify';
import { useAtom } from 'jotai';
import { authAtom } from '../states/auth';

interface authInterface {
    user?: userInterface;
    auth: boolean;
    login: (authData: loginDataInterface) => Promise<void>;
    register: (authData: IRegister) => Promise<void>;
    token: string;
}
type propsTypes = childrenProps;

const defaultValue = {
    auth: false,
    token: '',
    login: async (authData: loginDataInterface) => {
        console.log(authData);
    },
    register: async (authData: IRegister) => {
        console.log(authData);
    },
};

export const AuthContext = createContext<authInterface>(defaultValue);

export function AuthProvider(props: propsTypes) {
    const { children } = props;
    const [user, setUser] = useState<userInterface>();
    const [token, setToken] = useAtom(authAtom);
    const auth = user?.email ? true : false;
    useEffect(() => {
        currentUser();
    }, []);

    const login = async (authData: loginDataInterface) => {
        const { data, error } = await loginRequest(authData);
        if (data) {
            const newUser = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
            };
            setToken(data.Token);
            setUser(newUser);
        }
        if (error)
            notify.send({
                type: 'error',
                title: error,
                message: error,
            });
    };
    const register = async (registerData: IRegister) => {
        const { error } = await registerRequest(registerData);

        if (error)
            notify.send({
                type: 'error',
                title: 'Register Error',
                message: error,
            });
        else
            notify.send({
                type: 'success',
                title: 'Register successfully',
                message: 'wii',
            });
    };
    const currentUser = async () => {
        if (!token) {
            setUser(undefined);
            return;
        }
        const { data, error } = await currentUserRequest(token);
        if (data) {
            const newUser = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
            };
            setUser(newUser);
        }
        if (error)
            notify.send({
                type: 'error',
                title: 'Login Error',
                message: error,
            });
    };

    return (
        <AuthContext.Provider value={{ user, login, auth, token, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
