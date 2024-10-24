import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = process.env.PUBLIC_API_URL;

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (token) => {
  const usrToken = localStorage.getItem('token');
  const response = await axios.get(`http://localhost:3033/api/user/getUsers`, {
    headers: { Authorization: `Bearer ${usrToken}` },
  });
  console.log("response.data ", response.data.data);
  return response.data.data;
});

export const createUser = createAsyncThunk('user/createUser', async (userData) => {
  console.log("api url ", process.env);
  const response = await axios.post(`http://localhost:3033/api/auth/register`, userData);
  return response.data;
});


export const loginUser = createAsyncThunk('user/loginUser', async ({ username, password }) => {
  const response = await axios.post(`http://localhost:3033/api/auth/login`, { username, password });
  console.log(response.data.token);
  localStorage.setItem('token',response.data.token);
  return response.data;
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, updateData, token }) => {
  const usrToken = localStorage.getItem('token');
  const response = await axios.put(`http://localhost:3033/api/user/updateuser/${id}`, updateData, {
    headers: { Authorization: `Bearer ${usrToken}` },
  });
  return response.data;
});

export const deleteUser = createAsyncThunk('user/deleteUser', async ({ id, token }) => {
  const usrToken = localStorage.getItem('token');
  const response = await axios.put(`http://localhost:3033/api/user/deleteUsers/${id}`, {}, {
    headers: { Authorization: `Bearer ${usrToken}` },
  });
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Handle login logic
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload.id);
      });
  },
});

export default userSlice.reducer;
