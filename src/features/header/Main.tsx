import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import incubatorLogo from 'common/images/incubatorLogo.svg';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Preloader } from 'common/components/prealoder/Preloader';
import { authThunks } from 'features/auth/auth-slice';
import style from './Main.module.css';

export const Main = () => {
    const dispatch = useAppDispatch();
    const isInit = useAppSelector<boolean>((state) => state.app.isAppInitialized);
    const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);

    return (
        <div>
            <AppBar color={'inherit'}>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Typography style={{ marginLeft: '136px' }} variant="h6" component="div">
                        <img src={incubatorLogo} />
                    </Typography>
                    {isLoggedIn ? (
                        <Button
                            size={'large'}
                            style={{
                                textTransform: 'capitalize',
                                marginRight: '136px',
                                padding: '5px 27px',
                                borderRadius: '18px',
                            }}
                            variant="contained"
                            color={'primary'}
                            onClick={() => {
                                dispatch(authThunks.logout());
                            }}
                        >
                            Log out
                        </Button>
                    ) : (
                        <Link to={'auth/login'}>
                            <Button
                                size={'large'}
                                style={{
                                    textTransform: 'capitalize',
                                    marginRight: '136px',
                                    padding: '5px 27px',
                                    borderRadius: '18px',
                                }}
                                variant="contained"
                                color={'primary'}
                            >
                                Sign In
                            </Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
            <div className={style.mainDiv}>
                {isInit ? <Outlet /> : <Preloader />}
                {/*<Outlet />*/}
            </div>
        </div>
    );
};
