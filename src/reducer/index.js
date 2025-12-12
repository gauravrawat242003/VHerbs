import { combineReducers } from "@reduxjs/toolkit";

import authSlice from '../slices/authSlice';
import profileSlice from '../slices/profileSlice';
import herbSlice from '../slices/herbSlice';
import noteSlice from '../slices/noteSlice';
import chatBotSlice from '../slices/chatbotSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
    herb: herbSlice,
    note: noteSlice,
    chatbot: chatBotSlice,
});

export default rootReducer;