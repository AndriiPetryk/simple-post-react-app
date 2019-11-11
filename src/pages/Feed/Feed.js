import React, { Component } from 'react';

import axios from 'axios';
import Post from '../../components/Feed/Post/Post';
import Button from '../../components/Button/Button';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
// import Input from '../../components/Form/Input/Input';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import './Feed.css';

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      posts: [],
      totalPosts: 0,
      editPost: null,
      status: '',
      postPage: 1,
      postsLoading: true,
      editLoading: false,
    };
  }

  componentDidMount() {
    this.fetchUserStatus();
    this.loadPosts();
  }

  fetchUserStatus = async () => {
    const { token } = this.props;
    try {
      const response = await axios('http://localhost:8081/auth/status', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch user status.');
      }
      this.setState({ status: response.status });
    } catch (error) {
      this.catchError();
    }
  };

  loadPosts = async direction => {
    const { postPage } = this.state;
    const { token } = this.props;
    if (direction) {
      this.setState({ postsLoading: true, posts: [] });
    }
    let page = postPage;
    if (direction === 'next') {
      // eslint-disable-next-line no-plusplus
      page++;
      this.setState({ postPage: page });
    }
    if (direction === 'previous') {
      // eslint-disable-next-line no-plusplus
      page--;
      this.setState({ postPage: page });
    }

    try {
      const response = await axios.get(
        `http://localhost:8081/feed/posts?page=${page}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (response.status !== 200) {
        throw new Error('Failed to fetch posts.');
      }
      this.setState({
        posts: response.data.posts.map(post => {
          return {
            ...post,
            imagePath: post.imageUrl,
          };
        }),
        totalPosts: response.data.totalItems,
        postsLoading: false,
      });
    } catch (error) {
      this.catchError();
    }
  };

  statusUpdateHandler = async event => {
    const { token } = this.props;
    const { status } = this.state;
    event.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:8081/auth/status`, {
        status,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Can't update status!");
      }
    } catch (error) {
      this.catchError();
    }
  };

  newPostHandler = () => {
    this.setState({ isEditing: true });
  };

  startEditPostHandler = postId => {
    this.setState(prevState => {
      const loadedPost = { ...prevState.posts.find(p => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost,
      };
    });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editPost: null });
  };

  finishEditHandler = postData => {
    this.setState({
      editLoading: true,
    });
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('image', postData.image);
    let url = 'http://localhost:8081/feed/post';
    let method = 'POST';
    if (this.state.editPost) {
      url = 'http://localhost:8081/feed/post/' + this.state.editPost._id;
      method = 'PUT';
    }

    fetch(url, {
      method,
      body: formData,
      headers: {
        Authorization: 'Bearer ' + this.props.token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        const post = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          creator: resData.post.creator,
          createdAt: resData.post.createdAt,
        };
        this.setState(prevState => {
          let updatedPosts = [...prevState.posts];
          if (prevState.editPost) {
            const postIndex = prevState.posts.findIndex(
              p => p._id === prevState.editPost._id,
            );
            updatedPosts[postIndex] = post;
          } else if (prevState.posts.length < 2) {
            updatedPosts = prevState.posts.concat(post);
          }
          return {
            posts: updatedPosts,
            isEditing: false,
            editPost: null,
            editLoading: false,
          };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err,
        });
      });
  };

  statusInputChangeHandler = (input, value) => {
    this.setState({ status: value });
  };

  deletePostHandler = postId => {
    this.setState({ postsLoading: true });
    fetch('http://localhost:8081/feed/post/' + postId, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Deleting a post failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        this.setState(prevState => {
          const updatedPosts = prevState.posts.filter(p => p._id !== postId);
          return { posts: updatedPosts, postsLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ postsLoading: false });
      });
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  catchError = error => {
    this.setState({ error });
  };

  render() {
    return (
      <>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
        <FeedEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          loading={this.state.editLoading}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}/>
        {/* <section className="feed__status"> */}
        {/*  <form onSubmit={this.statusUpdateHandler}> */}
        {/*    <Input */}
        {/*      type="text" */}
        {/*      placeholder="Your status" */}
        {/*      control="input" */}
        {/*      onChange={this.statusInputChangeHandler} */}
        {/*      value={this.state.status} */}
        {/*    /> */}
        {/*    <Button mode="flat" type="submit"> */}
        {/*      Update */}
        {/*    </Button> */}
        {/*  </form> */}
        {/* </section> */}
        <section className="feed__control">
          <Button mode="raised" design="accent" onClick={this.newPostHandler}>
            New Post
          </Button>
        </section>
        <section className="feed">
          {this.state.postsLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Loader />
            </div>
          )}
          {this.state.posts.length <= 0 && !this.state.postsLoading ? (
            <p style={{ textAlign: 'center' }}>No posts found.</p>
          ) : null}
          {!this.state.postsLoading && (
            <Paginator
              onPrevious={this.loadPosts.bind(this, 'previous')}
              onNext={this.loadPosts.bind(this, 'next')}
              lastPage={Math.ceil(this.state.totalPosts / 2)}
              currentPage={this.state.postPage}>
              {this.state.posts.map(post => (
                <Post
                  key={post._id}
                  id={post._id}
                  author={post.creator.name}
                  date={new Date(post.createdAt).toLocaleDateString('en-US')}
                  title={post.title}
                  image={post.imageUrl}
                  content={post.content}
                  onStartEdit={this.startEditPostHandler.bind(this, post._id)}
                  onDelete={this.deletePostHandler.bind(this, post._id)}/>
              ))}
            </Paginator>
          )}
        </section>
      </>
    );
  }
}

export default Feed;
