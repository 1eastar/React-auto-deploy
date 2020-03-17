import axios from 'axios';

import { get, post, patch, remove, postWithoutToken, getWithoutToken } from './root';

const env = 'prod'
axios.defaults.baseURL = (env == 'dev') ? 'http://127.0.0.1:8000/' : 'http://ec2-13-209-85-63.ap-northeast-2.compute.amazonaws.com';
// const url = 'http://127.0.0.1:8000/';

const clientID = 'mmks6E3InDYPaGFqUOM0';
const clientSecret = 'wbsvN6cdju';
let api_uri = '';
const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const redirectURI = encodeURI("http://127.0.0.1:3000/main")


export default {
    getPost: () => {
        return get('api/posts/')
    },

    getDetailPost: (id) => {
        return get('api/posts/'+id+'/');
    },
    
    createPost: (data) => {
        return post('api/posts/', data)
    },

    deletePost: (id) => {
        return remove('api/posts/'+id+'/')
    },

    agreeToPost: (post_id) => {
        return patch(`api/posts/${post_id}/agree/`)
    },

    Login: (data) => { //data={username:'',password:'',token:''}

        return post('users/login/', data)
        // localStorage.setItem('token', );
    },

    Logout: () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('token');
        return post('users/logout/');
    },

    getUserToken: (userdata) => {
        return axios.post('api-token-auth/', userdata)
    },

    Signup: (data) => {
        return postWithoutToken('users/registration/', data);
    },

    getMyPost: () => {
        return get('api/posts/mypost/')
    },

    writeComment: (data) => {
        return post('api/comments/', data)
    },

    getCommentList: (postid) => {
        return get('api/comments/?postid='+postid);
    },


    // naver login
    getTokens: () => {
        return getWithoutToken('api/gettokens/');
    },

    // getAuthTokenNaver: () => {
    //     const temp_url = 'https://nid.naver.com/oauth2.0/'
    //     api_uri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}`;

    //     const config = {
    //         headers: {
    //             "Access-Control-Allow-Origin":"*"
    //         }
    //     }
    //     // "https://cors-anywhere.herokuapp.com/"+
    //     return axios.get(api_uri, config);
    // },

    // getAccessTokenNaver: () => {
    //     //
    // }

    setSaleUser: () => {
        return get('api/setsaleuser/');
    }

}




