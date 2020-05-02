import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {ApiWrapper} from "../store";
import {API_URL} from "../../index";
import {Task} from "./TaskSlice";
import {apiService} from "../../util/AxiosUtil";

export const fetchAllTasks = createAsyncThunk(
    'tasks/fetchAll',
    async () => {
        const response: AxiosResponse<ApiWrapper<Task[]>> = await apiService.get(`${API_URL}/tasks`)
        return response.data.data
    }
)