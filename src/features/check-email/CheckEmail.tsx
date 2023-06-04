import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authThunks } from 'features/auth/auth-slice';
import { Button, Paper } from '@mui/material';
import style from './CheckEmail.module.css';
import * as React from 'react';
import email from 'common/images/email-svg.svg';
import { buttonBackToLoginStyle } from 'features/check-email/check-email-style';

export const CheckEmail = () => {
    return (
        <div>
            <Paper>
                <h1 className={style.h1}>Check Email</h1>
                <div className={style.image}>
                    <img src={email} />
                </div>
                <div className={style.passwordFieldDiv}></div>
                <p className={style.text}>We've sent an Email with instructions to example@mail.com</p>
                <div>
                    <Link to={'/auth/login'}>
                        <Button style={buttonBackToLoginStyle} type="submit" variant="contained">
                            Back to login
                        </Button>
                    </Link>
                </div>
            </Paper>
        </div>
    );
};
