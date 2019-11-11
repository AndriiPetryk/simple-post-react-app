import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button/Button';
import Avatar from '../../Image/Avatar';
import './Post.css';

const post = props => {
  const {
    image,
    author,
    date,
    title,
    content,
    id,
    onStartEdit,
    onDelete,
  } = props;
  const imageUrl = `http://localhost:8081/${image}`;
  return (
    <article className="post" style={{ display: 'flex' }}>
      <div className="post__image">
        <Avatar imageUrl={imageUrl} contain />
      </div>
      <div
        style={{ width: `100%`, display: 'flex', 'flex-direction': 'column' }}>
        <header className="post__header">
          <h3 className="post__meta">
            Posted by {author} on {date}
          </h3>
          <h1 className="post__title">{title}</h1>
        </header>
        <div className="post__content">{content}</div>
        <div className="post__actions">
          <Button mode="flat" link={id}>
            View
          </Button>
          <Button mode="flat" onClick={onStartEdit}>
            Edit
          </Button>
          <Button mode="flat" design="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
};

post.propTypes = {
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  onStartEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default post;
