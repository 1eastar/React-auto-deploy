import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import apis from '../apis/api';

class PostList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            datalist: [],
            _token: '',
            detailPost: {},
        }
        // this.title = this.props.data.title;
        // this.content = this.props.data.content;
    }

    deletePost = async (id, e) => {
        e.preventDefault();

        await apis.deletePost(id)
        .then(res => {
            this.getList();
        })
    }

    agreePost = async (id, e) => {
        console.log(id)
        e.preventDefault();
        await apis.agreeToPost(id)
        .then(res => {
            console.log(res)
            this.getList();
        })
    }

    getList = async () => {
        // e.preventDefault();
    
        await apis.getPost().then(res => {
            console.log(res)
            this.setState({datalist: res.data})
        })
        .catch(err => {
            console.log(err);
        })
        
        // await apis.getMyPost().then(res => {
        //     console.log(res)
        //     this.setState({datalist: res.data})
        // })
        // .catch(err => {
        //     console.log(err);
        // })
      }

    componentDidMount() {
        this.getList();
        // localStorage.getItem('token').then(res => {
        //     this.setState({_token: res})
        // })
    }

    detail = (id, e) => {
        //
        e.preventDefault();

        this.props.history.push(`/detail/${id}/`, [id]);
    };


    render() {
        return (
            <div>
                <div>
                    {/* <h3>{this.title}</h3>
                    <h5>{this.content}</h5> */}
                    {this.state.datalist.map((data, index) => {
                        return(
                            <div key={data.id} className={'data'+data.id}>
                                <h3>{data.title}</h3>
                                <h5>{data.content}</h5>
                                <h5>{data.agree}</h5>
                                <div style={{flexDirection: 'row'}}>
                                    <form onSubmit={_.partial(this.deletePost, data.id)}>
                                        <input type='submit' value='delete' />
                                    </form>
                                    <form onSubmit={_.partial(this.agreePost, data.id)}>
                                        <input type='submit' value='agree' />
                                    </form>
                                    <form onSubmit={_.partial(this.detail, data.id)}>
                                        <input type='submit' value='detail' />
                                    </form>
                                    {/* <Link to='/detail' >detail</Link> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default PostList;