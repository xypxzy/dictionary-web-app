import {createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from 'axios';

interface IWords {
    meta: {
        uuid: string,
        stem: Array<string>
    }
    hw1: {
        hw: string,
        prs: Array<{
            mw: string ,
            sound: {
                audio: string
            }
        }>
    }
}

interface IWordsSliceState {
    data: IWords | undefined,
    status: 'idle' | 'loading' | 'success' | 'failed',
    error: string | undefined;
}

const initialState: IWordsSliceState= {
    data: undefined,
    status: 'idle',
    error: undefined,
}

export const getWords = createAsyncThunk(
    '@@data/getWords',
    async () => {
        const res = await axios.get(`https://www.dictionaryapi.com/api/v3/references/sd2/json/school?key=${API_KEY}`);
        return res.data;
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
            .addCase(getWords.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(getWords.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})


export const wordsReducer = wordsSlice.reducer