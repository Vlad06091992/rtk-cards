import * as React from 'react';
import { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button, InputAdornment, TextField } from '@mui/material';
import style from './UserName.module.css';
import { useAppDispatch } from 'app/hooks';
import { authThunks } from 'features/auth/auth-slice';

type PropsType = {
    name?: string;
    avatar?: string;
};

export const UserName = (props: PropsType) => {
    const dispatch = useAppDispatch();
    let [editMode, setEditMode] = useState(false);
    let [name, setName] = useState(props.name);

    useEffect(() => {
        setName(props.name);
    }, [props.name]);

    return (
        <div>
            {!editMode && (
                <div onClick={() => setEditMode(true)}>
                    <span className={style.name} id={'1'}>
                        {name}
                    </span>
                    <BorderColorIcon sx={{ marginLeft: '16px' }} />
                </div>
            )}
            {editMode && (
                <TextField
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: '347px' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    sx={{ padding: '0' }}
                                    onClick={() => {
                                        setEditMode(false);
                                        dispatch(authThunks.updateProfile({ name }));
                                    }}
                                    variant="contained"
                                    color={'primary'}
                                >
                                    {' '}
                                    SAVE
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                    label={'Nickname'}
                    variant={'standard'}
                    autoFocus
                    onBlur={() => {
                        setEditMode(false);
                        dispatch(authThunks.updateProfile({ name }));
                    }}
                    value={name}
                ></TextField>
            )}
        </div>
    );
};
