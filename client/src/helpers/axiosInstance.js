import axios from 'axios'

const BASE_URL = 'http://localhost:8080/'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export default axiosInstance;