import React, { Component } from 'react';
import { Link, } from 'react-router-dom';

import apis from '../apis/api';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            email: '',
            pw: '',
            pwConfirm: '',

        }
    }

    onSubmit = async (e) => {
        //
        // console.log(this.state.id);
        e.preventDefault();

        let data = {
            username: this.state.id,
            // email: this.state.email,
            password1: this.state.pw,
            password2: this.state.pwConfirm,
        }
        console.log(data)
        apis.Signup(data).then(res => {
            if(res.data.token){
                console.log(res);
                console.log('회원가입이 완료되었습니다.');
                this.props.history.goBack();
            }
            else{
                console.log('not token err :'+res);
            }
        })
        .catch(err => {
            console.log(err);
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
                    <input name='email' type='email' placeholder='email' onChange={this.handleChange}/>
                    <input name='pw' type='password' placeholder='pw' onChange={this.handleChange}/>
                    <input name='pwConfirm' type='password' placeholder='pwConfirm' onChange={this.handleChange}/>
                    <input type='submit' value='sign up' />
                </form>
            </div>
        );
    }
}

export default Signup;