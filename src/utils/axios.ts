import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'https://api.codenative.click/';
