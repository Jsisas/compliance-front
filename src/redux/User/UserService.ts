import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './UserSlice';
import { ApiWrapper } from '../store';
import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../App';

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
	const response: AxiosResponse<ApiWrapper<User[]>> = await axios.get(`${API_URL}/users`);
	return response.data.data;
});
