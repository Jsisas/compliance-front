import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from 'axios';
import {Requirement} from "./RequirementSlice";

export const fetchAllRequirements = createAsyncThunk(
    'requirements/fetchAllByRegulationId',
    async () => {
        const response: AxiosResponse<Requirement[]> = await axios.get("/api/regulations/1/requirements")
        return response.data
    }
)