import axios from 'axios';
import {createHashHistory} from 'history'
import {getUserAuth} from "./AuthUtil"; // or createBrowserHistory

const history = createHashHistory()

axios.interceptors.response.use(
    (response) => {
        console.log(response);
        return Promise.resolve(response)
    },
    (error) => {
        if (error.status === 403) {
            history.push("/login")
        } else {
            console.log(`${error.status} : ${error.statusText} => ${error.data}`)
        }
        return Promise.reject(error);
    }
);

axios.interceptors.request.use(function(config) {
    const token = getUserAuth()?.token;

    if ( token != null ) {
        //Back end breaks if token is included
        //config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function(err) {
    return Promise.reject(err);
});