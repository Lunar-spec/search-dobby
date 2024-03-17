import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user")) || {};

export const userSlice = createSlice({
    name: "user",
    initialState: {
        name: storedUser.name || "",
        token: storedUser.token || "",
        email: storedUser.email || "",
        isAuthenticated: storedUser.isAuthenticated || false,
    },
    reducers: {
        login: (state, action) => {
            const { name, token, email } = action.payload;
            state.name = name;
            state.token = token;
            state.email = email;
            state.isAuthenticated = true;

            localStorage.setItem("user", JSON.stringify(state));
        },
        logout: (state) => {
            state.name = "";
            state.token = "";
            state.email = "";
            state.isAuthenticated = false;

            localStorage.removeItem("user");
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
