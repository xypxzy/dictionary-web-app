import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import {IWords} from "../types/words.types.ts";

const API_KEY = `81933028-e9dd-4f31-a225-f64c48cc2fc0`;

interface IWordsSliceState {
    words: IWords[],
    similarWords: string[],
    status: 'idle' | 'loading' | 'success' | 'failed',
    error: string | undefined;
}

const initialState: IWordsSliceState = {
    words: [],
    similarWords: [],
    status: 'idle',
    error: undefined,
}

export const getWords = createAsyncThunk(
    '@@data/getWords',
    async (word: string) => {
        try {
            const res = await axios.get(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`);
            return res.data
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
            .addCase(getWords.fulfilled, (state, action: PayloadAction<IWords[] | string[]>) => {
                state.status = 'success';
                if (typeof action.payload[0] == "string") {
                    if(Array.isArray(action.payload)) {
                        state.similarWords = action.payload as string[];
                        state.words = [];
                    }
                }  else {
                    state.words = action.payload as IWords[];
                    state.similarWords = []
                }
            })
            .addCase(getWords.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ;
            })
    }
})


export const wordsReducer = wordsSlice.reducer