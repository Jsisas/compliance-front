import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosResponse} from 'axios';
import {Requirement} from "./RequirementSlice";
import {API_URL} from "../../index";
import {ApiWrapper} from "../store";
import {apiService} from "../../util/AxiosUtil";

export const fetchAllRequirements = createAsyncThunk(
    'requirements/fetchAllByRegulationId',
    async () => {
        const response: AxiosResponse<ApiWrapper<Requirement[]>> = await apiService.get(`${API_URL}/requirements`)
        return response.data.data
    }
)