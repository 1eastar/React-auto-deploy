import React from 'react';
import { Link } from 'react-router-dom';

import apis from '../apis/api';
import PostList from '../Components/PostList';


class Detail extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        comment: '',
        commentList: [],
        comment_id: 0,

        title: '', 
        content: '',
        postid: '',
    }
  }

  goMain = () => {
    this.setState({commentList: []})
    // this.props.history.pop();
  }

  getDetail = () => {
    // console.log(this.props.location)
    const postid = this.props.match.params.id;
    apis.getDetailPost(postid).then(res => {
      if(res.status === 200){
          console.log('get detail');
          console.log(res)
          this.setState({
            title: res.data.title,
            content: res.data.content,
            postid: res.data.id,
          });
          
      }
      else {
          console.log(res)
      }
    })
    .catch(err => {
        console.log(err);
    })

    this.getComments();
  }

  componentDidMount = () => {
    this.getDetail();
  }

  onChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  getComments = () => {
    const postid = this.props.match.params.id;

    apis.getCommentList(postid).then(res => {
      console.log(res)
      this.setState({commentList: res.data})
    })
  }

  writeComment = (e) => {
      //
      e.preventDefault();
      const data = {
        postid: this.state.postid,
        content: this.state.comment,
      }

      apis.writeComment(data).then(res => {
        console.log(res);
        this.setState({comment: ''});
        this.getComments();
      })
  }

  render() {
    return (
      <div>
        <div className="postSection">
            <p>title : {this.state.title}</p>
            <p>content : {this.state.content}</p>
            <br/>
            <Link to='/main' onClick={this.goMain}>Home</Link>
            <br/>
            <div className='comment'>
                <form onSubmit={this.writeComment}>
                    <textarea 
                    name="comment"
                    value={this.state.comment}
                    onChange={this.onChange}
                    />
                    <input type='submit' value='write' />
                </form>
            </div>
            <br/>
            <div>
              <p>comments</p><br/>
              {this.state.commentList.map((value, index) => {
                return <p key={value.pk}>{value.author_name}, {value.content}, {value.updated_at}</p>
              })}
            </div>
        </div>
      </div>
    );
  }
}

export default Detail;
