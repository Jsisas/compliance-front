import {Control} from "./ControlSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from 'axios';
import {ApiWrapper} from "../store";
import {API_URL} from "../../App";

export const fetchAllControls = createAsyncThunk(
    'controls/fetchAll',
    async () => {
        const response: AxiosResponse<ApiWrapper<Control[]>> = await axios.get(`${API_URL}/controls`)
        return response.data.data
    }
)

export const updateControl = createAsyncThunk(
    'controls/update',
    async (control: Control) => {
      try {
        return await axios.patch(`${API_URL}/controls/` + control.id,{control})
      } catch (err) {
        
        if (!err.response) {
            throw err
        }
      }
    }
  )

export const fetchControlById = createAsyncThunk(
    'controls/fetchControlById',
    async (controlId: string) => {
        return await (await axios.get(`${API_URL}/controls/` + controlId)).data.data;        
    }
)
