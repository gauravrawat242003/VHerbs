import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : null,
}

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setNotes(state, value) {
            localStorage.setItem('notes', JSON.stringify(value.payload));
            state.notes = value.payload;
        }
    }
});

export const {setNotes} = noteSlice.actions;
export default noteSlice.reducer;