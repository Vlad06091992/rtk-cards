import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button, Paper } from '@mui/material';
import style from './Profile.module.css';
import { buttonBackToLoginStyle } from 'features/check-email/check-email-style';
import catAva from 'common/images/cat_ava.jpg';
import { ProfileType } from 'features/auth/auth-api';
import { UserName } from 'common/components/user-name/UsertName';
import { useRedirect } from 'common/custom-hooks/useRedirect';
import LogoutIcon from '@mui/icons-material/Logout';
import { buttonLogoutStyle } from 'features/profile/profile-style';
import { authThunks } from 'features/auth/auth-slice';

export const Profile = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();
    let profile = useAppSelector<ProfileType | null>((state) => state.auth.profile);

    useRedirect('/auth/login', !isLoggedIn);

    return (
        <div>
            <Paper>
                <h1 className={style.h1}>Personal information</h1>
                <div className={style.profile}>
                    <div className={style.ava}>
                        <img src={catAva} />
                    </div>
                    <div className={style.userName}>
                        <UserName name={profile?.name} />
                    </div>
                    <div>
                        <p className={style.email}>{profile?.email}</p>

                        <Button
                            onClick={() => {
                                dispatch(authThunks.logout());
                            }}
                            sx={buttonLogoutStyle}
                            type="submit"
                            variant="contained"
                        >
                            <LogoutIcon sx={{ marginRight: '7px' }} /> Log out
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
};
