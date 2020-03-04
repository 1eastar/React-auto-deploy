import React, { Component } from 'react';
import { Link, } from 'react-router-dom';

import apis from './apis/api';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            pw: '',
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
        await apis.getUserToken(data).then(res => {
            data2 = {
                username: this.state.id,
                password: this.state.pw,
                // token: res.token
            }
            localStorage.setItem('token', res.data.token);
            console.log(res)
            console.log(localStorage.getItem('token'))

            apis.Login(data2).then(res => {
                console.log(res)
                if (res.status == 200){
                    console.log('로그인 되었습니다.')
                    this.props.history.push('/main');
                }
                else{
                    console.log(res)
                }
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
        
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input name='id' type='text' placeholder='id' onChange={this.handleChange}/>
                    <input name='pw' type='password' placeholder='pw' onChange={this.handleChange}/>
                    <input type='submit' value='sign in' />
                </form>
            </div>
        );
    }
}

export default Login;