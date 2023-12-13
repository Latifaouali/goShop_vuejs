import axios from 'axios';
import store from '@/store/index'
const Api=axios.create({
    baseURL:'http://localhost:8081'
});

Api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer${store.getters['moduleAuth/getToken']}`;
    config.headers['x-auth-token'] =store.getters['moduleAuth/getToken'];
    return config
});

export default Api;