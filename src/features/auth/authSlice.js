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
    const response = await apiClient.post("/login", user);
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
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { data, token } = action.payload;
      state.user = data;
      state.loggedIn = true;
      state.token = token;
      state.status = "succeeded";
    },
    [login.pending]: (state) => {
      state.status = "loading";
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [logout.fulfilled]: (state) => {
      state.user = {};
      state.loggedIn = false;
      state.token = null;
      state.status = "idle";
    },
  },
});

export const authSelector = (state) => state.auth;

export default authSlice.reducer;
