import { Control, ControlStatus, ControlType } from './ControlSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { ApiWrapper } from '../store';
import { API_URL } from '../../environment';

export interface UpsertControl {
	id: string;
	assignee_id: string;
	begins_at: string;
	description: string;
	kind: ControlType;
	requirement_ids: string[];
	state: ControlStatus;
	title: string;
}

export const fetchAllControls = createAsyncThunk('controls/fetchAll', async () => {
	const response: AxiosResponse<ApiWrapper<Control[]>> = await axios.get(`${API_URL}/controls`);
	return response.data.data;
});

export const fetchControlById = createAsyncThunk('controls/fetchControlById', async (controlId: string) => {
	return await (await axios.get(`${API_URL}/controls/` + controlId)).data.data;
});

export const upsertControl = createAsyncThunk('controls/upsert', async (control: Control) => {
	const upsertData: UpsertControl = {
		id: control.id,
		assignee_id: control.assignee.id,
		begins_at: control.begins_at,
		description: control.description,
		kind: control.kind,
		requirement_ids: control.requirements.map((requirement) => requirement.id),
		state: control.state,
		title: control.title,
	};

	if (upsertData.id) {
		const response: AxiosResponse<ApiWrapper<Control>> = await axios.patch(`${API_URL}/controls/` + upsertData.id, {
			control: upsertData,
		});
		return response.data.data;
	} else {
		const response: AxiosResponse<ApiWrapper<Control>> = await axios.post(`${API_URL}/controls`, {
			control: upsertData,
		});
		return response.data.data;
	}
});
