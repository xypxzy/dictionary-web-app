import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type fontTypes = 'sans'| 'serif' | 'monospace';
interface IFonts {
    font: fontTypes,
}
const initialState : IFonts  = {
    font : 'sans'
}
const fontsSlice = createSlice({
    name: '@@font',
    initialState,
    reducers: {
        changeFonts: (state, action: PayloadAction<fontTypes>) =>  {
            state.font = action.payload
        }
    }
})

export const {changeFonts} = fontsSlice.actions;
export const fontsReducer = fontsSlice.reducer;