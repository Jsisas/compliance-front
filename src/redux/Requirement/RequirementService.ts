import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosResponse} from 'axios';
import {Requirement} from "./RequirementSlice";
import {API_URL} from "../../index";
import {ApiWrapper} from "../store";
import axios from 'axios';

export const fetchAllRequirements = createAsyncThunk(
    'requirements/fetchAllByRegulationId',
    async () => {
        const response: AxiosResponse<ApiWrapper<Requirement[]>> = await axios.get(`${API_URL}/requirements`)
        return response.data.data
    }
)