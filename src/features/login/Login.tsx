import * as React from 'react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Checkbox, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authThunks } from 'features/auth/auth-slice';
import style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { buttonSignInStyle, buttonSignUpStyle, checkBoxStyle, textFieldStyle } from './login-style';
import { useRedirect } from 'common/custom-hooks/useRedirect';

type DataType = { email: string; password: string; rememberMe: boolean };

export const Login = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<DataType> = (data) => {
        dispatch(authThunks.login({ email: data.email, password: data.password, rememberMe: data.rememberMe }));
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DataType>();

    let [showPassword, setShowPassword] = useState(true);

    useRedirect('/profile', isLoggedIn);

    return (
        <div>
            <Paper>
                <h1 className={style.h1}>Sign in</h1>
                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextField style={textFieldStyle} variant={'standard'} label={'Email'} {...register('email')} />
                    </div>
                    <div className={style.passwordFieldDiv}>
                        <TextField
                            style={textFieldStyle}
                            variant="standard"
                            label="Password"
                            type={showPassword ? 'password' : 'text'}
                            {...register('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword && <Visibility />}
                                            {!showPassword && <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    {errors.password && <span>This field is required</span>}
                    <div className={style.checkBoxDiv}>
                        <Checkbox style={checkBoxStyle} {...register('rememberMe')} size={'small'} />{' '}
                        <div className={style.descriptionSpan}>Remember me</div>
                    </div>
                    <div className={style.forgotPassword}>
                        <Link
                            className={`${style.linkToRecoveryPassword} ${style.descriptionSpan}`}
                            to={'/auth/forgot-password'}
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div>
                        <Button style={buttonSignInStyle} type="submit" variant="contained">
                            Sign In
                        </Button>
                    </div>
                    <p className={style.noAccount}>Don't have an account ?</p>
                    <Button
                        onClick={() => {
                            navigate('/auth/register');
                        }}
                        style={buttonSignUpStyle}
                        type="button"
                        variant="text"
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </div>
    );
};
