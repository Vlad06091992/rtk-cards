import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    ArgUpdateProfileType,
    ArgLoginType,
    ArgRegisterType,
    ArgSetNewPasswordType,
    authAPI,
    ProfileType,
    RegisterResponseType,
    UpdateProfileResponseType,
} from 'features/auth/auth-api';
import { AppDispatch, RootState, ThunkApiConfig } from 'app/store';
import { createAppAsyncThunk } from 'common/utils/createAppAsyncThunk';
import { appActions } from 'app/app-slice';
import { boolean } from 'yup';

const slice = createSlice({
    name: 'auth',
    reducers: {},
    initialState: {
        profile: null as ProfileType | null,
        isLoggedIn: false,
        isRegistered: false,
        isMailSent: false,
        isPasswordSent: false,
    },
    extraReducers: (builder) => {
        builder.addCase(authMe.fulfilled, (state, action) => {
            if (!action.payload.profile) {
                debugger;
                state.isLoggedIn = false;
            } else {
                state.profile = action.payload.profile;
                state.isLoggedIn = true;
            }
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.profile = action.payload.updatedUser;
            state.isLoggedIn = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.profile = action.payload.profile;
            state.isLoggedIn = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isRegistered = true;
        });
        builder.addCase(forgot.fulfilled, (state, action) => {
            state.isMailSent = true;
        });
        builder.addCase(setNewPassword.fulfilled, (state, action) => {
            state.isPasswordSent = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            debugger;
            state.isLoggedIn = false;
        });
    },
});

export const setNewPassword = createAppAsyncThunk<void, ArgSetNewPasswordType>(
    'auth/setNewPassword',
    async (arg, thunkAPI) => {
        console.log(1);

        debugger;
        let res = await authAPI.setNewPassword(arg);
        console.log(res);
    }
);

const updateProfile = createAppAsyncThunk<UpdateProfileResponseType, ArgUpdateProfileType>(
    'auth/updateUser',
    async (arg, thunkAPI) => {
        console.log(arg);
        try {
            let res = await authAPI.updateProfile(arg);
            console.log(res);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
);
export const authMe = createAppAsyncThunk<{ profile: ProfileType }, void>('auth/me', async (arg, thunkAPI) => {
    try {
        let res = await authAPI.me();
        if (res.data) {
            return { profile: res.data };
        } else {
            return { profile: null };
        }
    } catch (e: any) {
        debugger;
        console.log(e.message);
        return { profile: null };
    } finally {
        thunkAPI.dispatch(appActions.setIsAppInitialized({ value: true }));
    }
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>('auth/loginUser', async (arg, thunkAPI) => {
    let res = await authAPI.login(arg);
    return { profile: res.data };
});

const logout = createAppAsyncThunk<void, void>('auth/logout', async (arg) => {
    let res = await authAPI.logout();
    console.log(res);
});

const forgot = createAppAsyncThunk<any, { email: string }>('auth/forgotPassword', async (arg) => {
    let res = await authAPI.forgot(arg.email);
    console.log(res);
});

const register = createAppAsyncThunk<RegisterResponseType, ArgRegisterType>(
    'auth/registerUser',
    async (arg, thunkAPI) => {
        let res = await authAPI.register(arg);
        return res.data;
    }
);

export const authActions = slice.actions;
export const authReducer = slice.reducer;
export const authThunks = { register, login, logout, authMe, forgot, setNewPassword, updateProfile };

// export const login = createAsyncThunk('auth/loginUser', (arg: ArgLoginType, thunkAPI) => {
//     return authAPI.login(arg).then((res) => {
//         return { profile: res.data };
//     });
// });
