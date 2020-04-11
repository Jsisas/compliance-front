import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from 'axios';
import { User } from "./UserSlice";

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAll',
    async () => {
        const response: AxiosResponse<User[]> = await axios.get("/api/users")
        return response.data
    }
)