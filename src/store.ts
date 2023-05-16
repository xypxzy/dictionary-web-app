import {configureStore} from "@reduxjs/toolkit";
import {themeReducer} from "./features/themeSlice.ts";
import {wordsReducer} from "./features/wordsSlice.ts";
import {fontsReducer} from "./features/fontsSlice.ts";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        words: wordsReducer,
        fonts: fontsReducer,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;