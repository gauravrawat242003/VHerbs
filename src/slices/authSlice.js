import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signupData : null,
    // if token present in session storage or local storage use from there 
    token : sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        }
    }
});

export const {setSignupData, setToken, setLoading} = authSlice.actions;

export default authSlice.reducer;