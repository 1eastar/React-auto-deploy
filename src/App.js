import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

import apis from './apis/api';
import PostList from './Components/PostList';


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      title: '',
      content: '',
      // datalist: [],
      usertoken: '',
      uid: '',
    }
  }

  onSubmit = async (e) => {
    const data = {
      title: this.state.title,
      content: this.state.content,
    }
    // e.preventDefault();

    await apis.createPost(data).then(res => 
      console.log(res))
  }
  
  onChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  logout = () => {
    apis.Logout();
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
        </div>

        <div className="viewSection">
          {/* {this.state.datalist.map((data, index) => {
            return <Post key={data.id} data={data} />
          })} */}
          <PostList />
        </div>
      </div>
    );
  }
}

export default App;
