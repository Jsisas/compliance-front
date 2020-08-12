import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ApiWrapper } from '../store';
import { API_URL } from '../../environment';
import { Authentication } from './AuthSlice';

export const authenticate = createAsyncThunk('auth/authenticate', async (token: string, thunkAPI) => {
	const response: AxiosResponse<ApiWrapper<Authentication>> = await axios.post(`${API_URL}/authorize`, {
		authorization: {
			token: token,
		},
	});
	return response.data.data;
});

export const fetchUserById = createAsyncThunk('users/fetchByIdStatus', async (token, thunkAPI) => {
	const response = await await axios.post(`${API_URL}/authorize`, {
		authorization: {
			token: token,
		},
	});
	return response.data;
});
