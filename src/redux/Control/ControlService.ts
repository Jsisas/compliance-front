import {Control} from "./ControlSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from 'axios';
import {API_URL} from "../../index";
import {ApiWrapper} from "../store";
import {apiService} from "../../util/AxiosUtil";

export const fetchAllControls = createAsyncThunk(
    'controls/fetchAll',
    async () => {
        const response: AxiosResponse<ApiWrapper<Control[]>> = await apiService.get(`${API_URL}/controls`)
        return response.data.data
    }
)

export const fetchControlById = createAsyncThunk(
    'controls/fetchById',
    async (controlId: string) => {
        const response: AxiosResponse<ApiWrapper<Control>> = await apiService.get(`${API_URL}/controls/` + controlId)
        return response.data.data
    }
)