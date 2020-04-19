import {createAsyncThunk} from "@reduxjs/toolkit"
import axios, {AxiosResponse} from 'axios';
import {User} from "./UserSlice";
import {API_URL} from "../../index";
import {ApiWrapper} from "../store";

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAll',
    async () => {
        const response: AxiosResponse<ApiWrapper<User[]>> = await axios.get(`${API_URL}/users`)
        return response.data.data
    }
)