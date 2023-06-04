import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        error: null as string | null,
        isLoading: false,
        isAppInitialized: false,
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading;
        },
        setIsAppInitialized: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isAppInitialized = action.payload.value;
        },
    },
});

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
