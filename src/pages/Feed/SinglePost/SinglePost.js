import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      date: '',
      image: '',
      content: '',
    };
  }

  componentDidMount() {
    const { match, token } = this.props;
    const { postId } = match.params;
    fetch('http://localhost:8080/feed/post/' + postId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch status');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          title: resData.post.title,
          author: resData.post.creator.name,
          image: 'http://localhost:8080/' + resData.post.imageUrl,
          date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
          content: resData.post.content,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { title, author, date, image, content } = this.state;
    return (
      <section className="single-post">
        <h1>{title}</h1>
        <h2>
          Created by {author} on {date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={image} />
        </div>
        <p>{content}</p>
      </section>
    );
  }
}

SinglePost.propTypes = {
  match: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
};

export default SinglePost;
