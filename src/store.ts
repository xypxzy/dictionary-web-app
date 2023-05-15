import {configureStore} from "@reduxjs/toolkit";
import {themeReducer} from "./features/theme/themeSlice.ts";
import {wordsReducer} from "./features/words/wordsSlice.ts";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        words: wordsReducer,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;