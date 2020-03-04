import axios from 'axios';

import { get, post, remove } from './root';

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

export default {
    getPost: () => {
        return get('api/posts/')
    },
    
    createPost: (data) => {
        return post('api/posts/', data)
    },

    deletePost: (id) => {
        return remove('api/posts/'+id)
    },

    agreeToPost: (post_id) => {
        return get(`api/posts/${post_id}/agree`)
    },

    Login: (data) => { //data={username:'',password:'',token:''}

        return post('api/login/', data)
        // localStorage.setItem('token', );
    },

    Logout: () => {
        localStorage.removeItem('token');
    },

    getUserToken: (userdata) => {
        return axios.post('api-token-auth/', userdata)
    }

}




