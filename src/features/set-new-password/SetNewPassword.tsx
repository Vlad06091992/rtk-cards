import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authThunks } from 'features/auth/auth-slice';
import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import style from './SetNewPassword.module.css';
import { buttonBackToLoginStyle } from 'features/check-email/check-email-style';
import * as React from 'react';
import { useState } from 'react';
import { textFieldStyle } from 'features/forgot-password/forgot-password-style';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRedirect } from 'common/custom-hooks/useRedirect';

export const SetNewPassword = () => {
    const { tokenId } = useParams<{ tokenId: string }>();
    const isPasswordSent = useAppSelector((state) => state.auth.isPasswordSent);
    console.log(tokenId);

    const navigate = useNavigate();
    let [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<any> = (data) => {
        if (tokenId) {
            dispatch(authThunks.setNewPassword({ password: data.password, resetPasswordToken: tokenId }));
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>();

    useRedirect('/auth/login', isPasswordSent);

    return (
        <div>
            <Paper>
                <h1 className={style.h1}>Create new password</h1>
                <form className={style.setPassForm} onSubmit={handleSubmit(onSubmit)}>
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

                    {errors.password && <span>This field is required</span>}
                    <div className={style.passwordFieldDiv}></div>
                    {errors.password && <span>This field is required</span>}
                    <p className={style.text}>Create new password and we will send you further instructions to email</p>
                    <div>
                        <Button
                            style={buttonBackToLoginStyle}
                            // type="submit"
                            variant="contained"
                            onClick={() => {}}
                            type={'submit'}
                        >
                            Create new Password
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
};
