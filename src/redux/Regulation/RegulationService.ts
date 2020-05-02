import {Regulation} from "./RegulationSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from 'axios';
import {API_URL} from "../../index";
import {ApiWrapper} from "../store";
import {apiService} from "../../util/AxiosUtil";

export const fetchAllRegulations = createAsyncThunk(
    'regulations/fetchAll',
    async () => {
        const response: AxiosResponse<ApiWrapper<Regulation[]>> = await apiService.get(`${API_URL}/regulations`)
        return response.data.data
    }
)