import axios from 'axios';
import store from '@/store/index'
const Api=axios.create({
    baseURL:'https://goshop-3bs3.onrender.com'
});

Api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer${store.getters['moduleAuth/getToken']}`;
    config.headers['x-auth-token'] =store.getters['moduleAuth/getToken'];
    return config
});

export default Api;