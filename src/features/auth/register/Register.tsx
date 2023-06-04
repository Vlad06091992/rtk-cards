import * as React from 'react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authThunks } from 'features/auth/auth-slice';
import style from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { buttonSignInStyle, buttonSendInstructionsStyle, textFieldStyle } from './register-style';
import { useRedirect } from 'common/custom-hooks/useRedirect';

type DataType = { email: string; password: string; showPassword?: string };

export const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isRegistered = useAppSelector<boolean>((state) => state.auth.isRegistered);
    let [showPassword, setShowPassword] = useState(true);

    const onSubmit: SubmitHandler<DataType> = (data) => {
        if (data.password === data.showPassword) {
            dispatch(authThunks.register({ email: data.email, password: data.password }));
        } else {
            console.log('incorrectPassword');
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DataType>();

    useRedirect('/login', isRegistered);

    return (
        <div>
            <Paper>
                <h1 className={style.h1}>Sign Up</h1>
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
                    <div className={style.passwordFieldDiv}>
                        <TextField
                            style={textFieldStyle}
                            variant="standard"
                            label="Password"
                            type={showPassword ? 'password' : 'text'}
                            {...register('showPassword')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                setShowPassword(!showPassword);
                                            }}
                                        >
                                            {showPassword && <Visibility />}
                                            {!showPassword && <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    {errors.password && <span>This field is required</span>}

                    <div>
                        <Button style={buttonSendInstructionsStyle} type="submit" variant="contained">
                            Sign Up
                        </Button>
                    </div>
                    <p className={style.noAccount}>Already have an account ?</p>
                    <Button
                        onClick={(e) => {
                            navigate('/login');
                        }}
                        style={buttonSignInStyle}
                        type="button"
                        variant="text"
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </div>
    );
};
