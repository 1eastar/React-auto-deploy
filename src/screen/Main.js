import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

import apis from '../apis/api';
import PostList from '../Components/PostList';
import api from '../apis/api';


class Main extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      title: '',
      content: '',
      // datalist: [],
      usertoken: '',
      uid: '',

      isNormal: true,
    }

    this.naverCode = '';
    this.naverState = '';

  }

  onSubmit = async (e) => {
    const data = {
      title: this.state.title,
      content: this.state.content,
      author: await localStorage.getItem('user_id')
    }
    e.preventDefault();

    await apis.createPost(data).then(res => 
      console.log(res))
  }
  
  onChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  logout = () => {
    apis.Logout();
    this.props.history.push('/');
  }

  componentDidMount = () => {
    // console.log(this.props.location.hash.substr(1))
    // console.log(this.props.location.hash.substr(1).split('&'))
    // this.naverCode = this.props.match.params.code;
    // this.naverState = this.props.match.params.state;
    console.log(this.props)
  }

  setSaleUser = () => {
    api.setSaleUser().then(res => {
      if(res.data.success){
        console.log(res.data.msg)
        console.log(res)
        this.setState({isNormal: res.data.isNormal})
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <div className="postSection">
          <form onSubmit={this.onSubmit}>
            <input 
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              />
            <textarea 
              name="content"
              value={this.state.content}
              onChange={this.onChange}
              />
            <input type='submit' value='submit' />
          </form>
          <Link to='/' onClick={this.logout}>logout</Link>
          <button onClick={this.setSaleUser}>{this.state.isNormal ? '판매자용': '일반'} 계정으로 변경</button>
        </div>

        <div className="viewSection">
          {/* {this.state.datalist.map((data, index) => {
            return <Post key={data.id} data={data} />
          })} */}
          <PostList history={this.props.history}/>
        </div>
      </div>
    );
  }
}

export default Main;
