import { Regulation } from './RegulationSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ApiWrapper } from '../store';
import { API_URL } from '../../App';

export const fetchAllRegulations = createAsyncThunk('regulations/fetchAll', async () => {
	const response: AxiosResponse<ApiWrapper<Regulation[]>> = await axios.get(`${API_URL}/regulations`);
	return response.data.data;
});

export const fetchRegulationById = createAsyncThunk('regulations/fetchRegulationById', async (regulationId: string) => {
	const response: AxiosResponse<ApiWrapper<Regulation>> = await axios.get(`${API_URL}/regulations/` + regulationId);
	return response.data.data;
});
