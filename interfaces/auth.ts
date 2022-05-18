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
}
export interface loginDataResponse {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  Token: string;
}

export interface IRegister extends loginDataInterface {
  firstName: string;
  lastName: string;
}

export interface IRegisterResponse {
  user: IUser;
}
