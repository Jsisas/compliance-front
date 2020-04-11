import { Control } from "./ControlSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from 'axios';

export const fetchAllControls = createAsyncThunk(
    'controls/fetchAll',
    async () => {
        const response: AxiosResponse<Control[]> = await axios.get("/api/controls")
        return response.data
    }
)