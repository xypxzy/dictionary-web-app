import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type themeType = 'light' | 'dark';
interface ITheme {
    currentTheme: themeType
}

const initialThemeState: ITheme = {
    currentTheme: "light"
}

const themeSlice = createSlice( {
    name: '@@theme',
    initialState: initialThemeState,
    reducers: {
        changeTheme: (state, action:PayloadAction<themeType>) => {
            state.currentTheme = action.payload;
        }
    }
})

export const themeReducer = themeSlice.reducer;
export const {changeTheme} = themeSlice.actions;