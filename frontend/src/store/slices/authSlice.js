import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const verifyAuth = createAsyncThunk(
  'auth/verify',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/auth/me');
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Not authenticated');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle',    
    error: null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      // verifyAuth
      .addCase(verifyAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = 'idle';
      });
  },
});

export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;