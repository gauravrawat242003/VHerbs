import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    step: 1,
    herb: null,
    editHerb: false,
}

const herbSlice = createSlice({
    name: 'herb',
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },
        setHerb: (state, action) => {
            state.herb = action.payload;
        },
        setEditHerb: (state, action) => {
            state.editHerb = action.payload;
        },
    },
});

export const {setStep, setHerb, setEditHerb} = herbSlice.actions;

export default herbSlice.reducer;