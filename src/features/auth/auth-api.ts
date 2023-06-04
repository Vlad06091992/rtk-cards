import { instance } from 'common/api/api';
import axios, { AxiosResponse } from 'axios';

export const authAPI = {
    updateProfile(payload: ArgUpdateProfileType) {
        return instance.put('auth/me', payload);
    },
    setNewPassword(payload: ArgSetNewPasswordType) {
        return instance.post('auth/set-new-password', payload);
    },
    forgot(email: string) {
        return instance.post('auth/forgot', {
            email,
            from: 'front-end-developer <Smirnov.ru92@mail.ru>',
            message: `<div style="background-color: lime; padding: 15px">
                      <a href='http://localhost:3000/#/auth/set-new-password/$token$'>
                       link</a></div>`,
        });
    },

    logout() {
        return instance.delete('auth/me');
    },
    me() {
        return instance.post('auth/me', {});
    },
    login(payload: ArgLoginType) {
        return instance.post<LoginResponseType>('auth/login', payload);
    },
    register(payload: ArgRegisterType) {
        return instance.post<RegisterResponseType>('auth/register', payload);
    },
};
export type ArgSetNewPasswordType = {
    password: string;
    resetPasswordToken: string;
};

export type ArgUpdateProfileType = {
    name?: string;
    avatar?: string; // url or base64
};

export type ArgRegisterType = Omit<ArgLoginType, 'rememberMe'>;
export type ArgLoginType = { email: string; password: string; rememberMe: boolean };

export type RegisterResponseType = {
    addedUser: ProfileType;
};

export type UpdateProfileResponseType = {
    updatedUser: ProfileType;
};

export type ProfileType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
};

export type LoginResponseType = ProfileType & {
    token: string;
    tokenDeathTime: number;
};
