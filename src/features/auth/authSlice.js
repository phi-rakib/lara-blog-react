import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/api";
/**
 * 
 * Use the below code for cookie based auth for first party SPA
 * 
export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    await apiClient.get("/sanctum/csrf-cookie");
    const response = await apiClient.post("/api/login", user);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});
*
*/

export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await apiClient.post("/api/login", user);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.removeItem("user");
  } catch (error) {
    throw Error(error);
  }
});

const initialState = {
  user: {},
  loggedIn: (localStorage.getItem("user") ?? "").length > 0,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      state.loggedIn = true;
      state.token = action.payload.token;
    },
    [logout.fulfilled]: (state) => {
      state.user = {};
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const isLoggedIn = (state) => state.auth.loggedIn;

export const authToken = (state) => state.auth.token;

export const authUser = (state) => state.auth.user;

export default authSlice.reducer;
