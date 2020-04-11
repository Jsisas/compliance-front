import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAll',
    async () => {
        const response = await axios.get("/api/users")
        return response.data
    }
)