import axios from 'axios';

export async function getAuthorizedHeader(){
    let _token = await localStorage.getItem('token')
    console.log(_token)
    if(_token){
        let config = {
            headers: {
                'Authorization': 'JWT '+_token
            }
        }
        return config
    }
    else{
        let config = {
            headers: {
                'Authorization': 'Token'
            }
        }
        return config
    }
}


export async function get(url) {
    return getAuthorizedHeader().then(config => {
        return axios.get(url, config);
    })
}

export async function post(url, data){
    return getAuthorizedHeader().then(config => {
        return axios.post(url, data, config);
    })
}

export async function patch(url, data){
    return getAuthorizedHeader().then(config => {
        return axios.patch(url, data, config);
    })
}

export async function getWithoutToken(url) {
    return axios.get(url);
}

export async function postWithoutToken(url, data){
    return axios.post(url, data);
}

export async function remove(url){
    return getAuthorizedHeader().then(config => {
        return axios.delete(url, config);
    })
}