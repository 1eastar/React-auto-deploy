import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import NaverLogin from 'react-naver-login';

import apis from '../apis/api';

const clientID = 'mmks6E3InDYPaGFqUOM0';
const clientSecret = 'wbsvN6cdju';
let api_uri = '';
const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const redirectURI = encodeURI("http://127.0.0.1:8000/api/naverauth")

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            pw: '',
            data: '',
        }
    }

    onSubmit = async (e) => {
        //
        // console.log(this.state.id);
        e.preventDefault();
        let data2;
        let data = {
            username: this.state.id,
            password: this.state.pw,
        }

        console.log(data)
        // await apis.getUserToken(data).then(res => {
        //     data2 = {
        //         username: this.state.id,
        //         password: this.state.pw,
        //         // token: res.token
        //     }
        //     localStorage.setItem('token', res.data.token);
        //     console.log(res)
        //     console.log(localStorage.getItem('token'))

            apis.Login(data).then(res => {
                console.log(res)
                if (res.status == 200){
                    console.log('로그인 되었습니다.')
                    localStorage.setItem('user_id', res.data.user.pk);
                    localStorage.setItem('token', res.data.token);
                    this.props.history.push('/main');
                }
                else{
                    console.log(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
        // })
        // .catch(err => {
        //     console.log(err)
        // })
        
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    signup = () => {
        //
        this.props.history.push('/signup');
    }

    onNaverLogin = (naverUser) => {
        console.log(naverUser);
        console.log(this.props.match)
    }

    // onNaverAuth = () => {
    //     apis.getAuthTokenNaver().then(res => {
    //         console.log(res);
    //         this.htmlobj = document.createElement('div');
    //         this.htmlobj.innerHTML = res.data;
            
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
        
    // }


    render() {
        return (
            <div style={{flexDirection: 'row'}}>
                <form onSubmit={this.onSubmit}>
                    <input name='id' type='text' placeholder='id' onChange={this.handleChange}/>
                    <input name='pw' type='password' placeholder='pw' onChange={this.handleChange}/>
                    <input type='submit' value='sign in' />
                </form>
                <form onSubmit={this.signup}>
                    <input type='submit' value='sign up' />
                </form>
                {/* <button value='네이버 아이디로 로그인' type='button' onClick={this.onNaverAuth}/> */}
                <br/>
                <a href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}`} >naver login</a>
                <NaverLogin
                    clientId="mmks6E3InDYPaGFqUOM0"
                    callbackUrl="http://127.0.0.1:8000/api/naverauth"
                    render={(props) => <div onClick={props.onClick}>Naver Login</div>}
                    onSuccess={this.onNaverLogin}
                    onFailure={result => console.error(result)}
                />
            </div>
        );
    }
}

export default Login;