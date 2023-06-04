export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photo: string;
}

export interface loginDataInterface {
    email: string;
    password: string;
    keepLogged: boolean;
}
export interface loginDataResponse {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    Token: string;
}

export interface IRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IRegisterResponse {
    user: IUser;
}
