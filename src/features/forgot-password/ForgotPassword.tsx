import style from './ForgotPassword.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authThunks } from 'features/auth/auth-slice';
import * as React from 'react';
import { useState } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import {
    buttonSendInstructionsStyle,
    buttonTryLoginInStyle,
    textFieldStyle,
} from 'features/forgot-password/forgot-password-style';
import { useRedirect } from 'common/custom-hooks/useRedirect';

export const ForgotPassword = () => {
    const isMailSent = useAppSelector((state) => state.auth.isMailSent);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data);

        dispatch(authThunks.forgot({ email: data.email }));
    };

    useRedirect('/auth/check-email', isMailSent);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>();

    return (
        <div>
            <Paper>
                <h1 className={style.h1}>Forgot your password?</h1>
                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <TextField style={textFieldStyle} variant={'standard'} label={'Email'} {...register('email')} />
                    </div>

                    {errors.password && <span>This field is required</span>}
                    <div className={style.passwordFieldDiv}></div>
                    {errors.password && <span>This field is required</span>}
                    <p className={style.text}>Enter your email address and we will send you further instructions</p>
                    <div>
                        <Button style={buttonSendInstructionsStyle} type="submit" variant="contained">
                            Send Instructions
                        </Button>
                    </div>
                    <p className={style.rememberPassword}>Did you remember your password ?</p>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/auth/login');
                        }}
                        style={buttonTryLoginInStyle}
                        type="button"
                        variant="text"
                    >
                        Try logging in
                    </Button>
                </form>
            </Paper>
        </div>
    );
};
