import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ApiWrapper } from '../store';
import { Task } from './TaskSlice';
import { API_URL } from '../../App';

export const fetchAllTasks = createAsyncThunk('tasks/fetchAll', async () => {
	const response: AxiosResponse<ApiWrapper<Task[]>> = await axios.get(`${API_URL}/tasks`);
	return response.data.data;
});

export const createTask = createAsyncThunk('tasks/create', async (task: Task) => {
	const response: AxiosResponse<ApiWrapper<Task>> = await axios.post(`${API_URL}/tasks`, {
		task,
	});
	return response.data.data;
});

export const updateTask = createAsyncThunk('tasks/update', async (task: Task) => {
	const response: AxiosResponse<ApiWrapper<Task>> = await axios.patch(`${API_URL}/tasks/` + task.id, {
		task,
	});
	return response.data.data;
});
