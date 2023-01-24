import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = {
    notes: [],
}

const lorem = (charsCount) => {
    const str = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";
    const len = str.length;
    const count = Math.ceil(charsCount / len);
    return str.repeat(count).slice(0, charsCount);
}

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addOneBig: (state) => {
            state.notes.push({
                id: nanoid(),
                text: lorem(random(1500, 2500)),
                done: false,
            });
        },
        addThousandSmall: (state) => {
            for (let i = 0; i < 1000; i++) {
                state.notes.push({
                    id: nanoid(),
                    text: lorem(random(150, 550)),
                    done: false,
                });
            }
        },
        doneAllToggle: (state) => {
            state.notes.forEach(note => note.done = !note.done);
        }
    },
})

export const { addThousandSmall, addOneBig, doneAllToggle } = notesSlice.actions;

export default notesSlice.reducer;
