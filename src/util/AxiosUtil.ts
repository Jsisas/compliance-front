import axios from 'axios';
import {getUserAuth} from "./AuthUtil";

// When token is needed
// const axiosConfig = axios.defaults.headers.common = {'Authorization': `bearer ${getUserAuth()?.token}`};

export const apiService = axios;