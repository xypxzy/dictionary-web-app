import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import {IWords} from "../types/words.types.ts";

const API_KEY = `892285f9-c566-49e3-81e1-9fa7a09ae3d4`;
interface IWordsSliceState {
    data: IWords[],
    status: 'idle' | 'loading' | 'success' | 'failed',
    error: string | undefined;
}

const initialState: IWordsSliceState= {
    data: [],
    status: 'idle',
    error: undefined,
}

export const getWords = createAsyncThunk(
    '@@data/getWords',
    async (words : string) => {
        try {
            const res = await axios.get(`https://dictionaryapi.com/api/v3/references/sd2/json/${words}?key=${API_KEY}`);
            return res.data;
        } catch (error) {
            throw Error('Error fetching data');
        }
    }
)

const wordsSlice = createSlice({
    name: '@@words',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getWords.pending, state => {
                state.status = 'loading'
            })
            .addCase(getWords.fulfilled, (state, action:PayloadAction<IWords[]>) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(getWords.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
            })
    }
})


export const wordsReducer = wordsSlice.reducer