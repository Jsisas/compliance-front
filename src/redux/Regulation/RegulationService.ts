import {Regulation} from "./RegulationSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from 'axios';

export const fetchAllRegulations = createAsyncThunk(
    'regulations/fetchAll',
    async () => {
        const response: AxiosResponse<Regulation[]> = await axios.get("/api/regulations")
        return response.data
    }
)