import {Regulation} from "./RegulationSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from 'axios';
import {API_URL} from "../../index";
import {ApiWrapper} from "../store";

export const fetchAllRegulations = createAsyncThunk(
    'regulations/fetchAll',
    async () => {
        const response: AxiosResponse<ApiWrapper<Regulation[]>> = await axios.get(`${API_URL}/regulations`)
        return response.data.data;
    }
)