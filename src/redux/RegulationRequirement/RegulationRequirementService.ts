import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from 'axios';
import {Requirement} from "../Requirement/RequirementSlice";

export const fetchRegulationRequirements = createAsyncThunk(
    'regulationRequirements/fetchAllById',
    async (id: number) => {
        const response: AxiosResponse<Requirement[]> = await axios.get(`/api/regulations/${id}/requirements`)
        return response.data
    }
)