import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {Requirement} from './RequirementSlice';
import {ApiWrapper} from '../store';
import {API_URL} from '../../App';

export const fetchAllRequirements = createAsyncThunk(
	'requirements/fetchAllByRegulationId',
	async () => {
		const response: AxiosResponse<ApiWrapper<Requirement[]>> = await axios.get(`${API_URL}/requirements`);
		return response.data.data;
	}
);

export const fetchRequirementById = createAsyncThunk(
	'requirements/fetchRequirementById',
	async (requirementId: string) => {
		const response: AxiosResponse<ApiWrapper<Requirement>> = await axios.get(`${API_URL}/requirements/` + requirementId);
		return response.data.data;
	}
);
