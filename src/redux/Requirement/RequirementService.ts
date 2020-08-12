import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { Requirement } from './RequirementSlice';
import { ApiWrapper } from '../store';
import { API_URL } from '../../environment';

export interface UpsertRequirement {
	id: string;
	title: string;
	description: string;
	chapter_name: string;
	chapter_number: string;
	paragraph_number: string;
	regulation_ids: string[];
	control_ids: string[];
}

export const fetchAllRequirements = createAsyncThunk('requirements/fetchAllByRegulationId', async () => {
	const response: AxiosResponse<ApiWrapper<Requirement[]>> = await axios.get(`${API_URL}/requirements`);
	return response.data.data;
});

export const fetchRequirementById = createAsyncThunk(
	'requirements/fetchRequirementById',
	async (requirementId: string) => {
		const response: AxiosResponse<ApiWrapper<Requirement>> = await axios.get(
			`${API_URL}/requirements/` + requirementId
		);
		return response.data.data;
	}
);

export const upsertRequirement = createAsyncThunk('requirement/upsert', async (requirement: Requirement) => {
	const upsertData: UpsertRequirement = {
		id: requirement.id,
		description: requirement.description,
		regulation_ids: requirement.regulations.map((regulation) => regulation.id),
		control_ids: requirement.controls.map((control) => control.id),
		title: requirement.title,
		chapter_name: requirement.chapter_name,
		chapter_number: requirement.chapter_number,
		paragraph_number: requirement.paragraph_number,
	};

	if (upsertData.id) {
		const response: AxiosResponse<ApiWrapper<Requirement>> = await axios.patch(
			`${API_URL}/requirements/` + upsertData.id,
			{
				requirement: upsertData,
			}
		);
		return response.data.data;
	} else {
		const response: AxiosResponse<ApiWrapper<Requirement>> = await axios.post(`${API_URL}/requirements`, {
			requirement: upsertData,
		});
		return response.data.data;
	}
});
