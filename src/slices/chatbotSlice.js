import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    chats: localStorage.getItem('chats') ? JSON.parse(localStorage.getItem('chats')) : null
}

const chatBotSlice = createSlice({
    name: 'chatbot',
    initialState: initialState,
    reducers: {
        setChats(state, value) {
            state.chats = value.payload; 
            // store chats in local storage
            localStorage.setItem('chats', JSON.stringify(value.payload));
        }
    }
});

export const {setChats} = chatBotSlice.actions;

export default chatBotSlice.reducer;