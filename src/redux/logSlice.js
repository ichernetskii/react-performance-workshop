import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = [];

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        add: (state, {payload}) => {
            return [
                ...state,
                {
                    id: nanoid(),
                    size: payload.size,
                    color: payload.color,
                }
            ];
        },
    },
})

export const { add } = logSlice.actions;

export default logSlice.reducer;
