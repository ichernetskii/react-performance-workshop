import {createSlice, nanoid} from '@reduxjs/toolkit'
import produce from "immer";

const initialState = [];

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        add: (state, {payload}) => {
            return produce(state, draft => {
                draft.push({
                    id: nanoid(),
                    size: payload.size,
                    color: payload.color,
                });
            });
        },
    },
})

export const { add } = logSlice.actions;

export default logSlice.reducer;
