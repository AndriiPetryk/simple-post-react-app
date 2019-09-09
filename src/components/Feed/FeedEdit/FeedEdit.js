import React, { Component } from 'react';

import Backdrop from '../../Backdrop/Backdrop';
import Modal from '../../Modal/Modal';
import Input from '../../Form/Input/Input';
import FilePicker from '../../Form/Input/FilePicker';
import Image from '../../Image/Image';
import { required, length } from '../../../util/validators';
import { generateBase64FromImage } from '../../../util/image';

const POST_FORM = {
  title: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  image: {
    value: '',
    valid: false,
    touched: false,
    validators: [required],
  },
  content: {
    value: '',
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
};

class FeedEdit extends Component {
  constructor() {
    super();
    this.state = {
      postForm: POST_FORM,
      formIsValid: false,
      imagePreview: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { editing, selectedPost } = this.props;
    const { editing: prevEditing, selectedPost: prevSelectedProps } = prevProps;
    if (
      editing &&
      prevEditing !== editing &&
      prevSelectedProps !== selectedPost
    ) {
      const postForm = {
        title: {
          ...prevState.postForm.title,
          value: selectedPost.title,
          valid: true,
        },
        image: {
          ...prevState.postForm.image,
          value: selectedPost.imagePath,
          valid: true,
        },
        content: {
          ...prevState.postForm.content,
          value: selectedPost.content,
          valid: true,
        },
      };
      this.setState({ postForm, formIsValid: true });
    }
  }

  postInputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          this.setState({ imagePreview: b64 });
        })
        .catch(event => {
          this.setState({ imagePreview: null });
        });
    }
    this.setState(prevState => {
      let isValid = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const validator of prevState.postForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.postForm,
        [input]: {
          ...prevState.postForm[input],
          valid: isValid,
          value: files ? files[0] : value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        postForm: updatedForm,
        formIsValid,
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        postForm: {
          ...prevState.postForm,
          [input]: {
            ...prevState.postForm[input],
            touched: true,
          },
        },
      };
    });
  };

  cancelPostChangeHandler = () => {
    const { onCancelEdit } = this.props;
    this.setState({
      postForm: POST_FORM,
      formIsValid: false,
    });
    onCancelEdit();
  };

  acceptPostChangeHandler = () => {
    const { onFinishEdit } = this.props;
    const { postForm } = this.state;
    const post = {
      title: postForm.title.value,
      image: postForm.image.value,
      content: postForm.content.value,
    };
    onFinishEdit(post);
    this.setState({
      postForm: POST_FORM,
      formIsValid: false,
      imagePreview: null,
    });
  };

  render() {
    const { editing, loading } = this.props;
    const { formIsValid, postForm, imagePreview } = this.state;
    return editing ? (
      <>
        <Backdrop onClick={this.cancelPostChangeHandler} />
        <Modal
          title="New Post"
          acceptEnabled={formIsValid}
          onCancelModal={this.cancelPostChangeHandler}
          onAcceptModal={this.acceptPostChangeHandler}
          isLoading={loading}
        >
          <form>
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler}
              valid={postForm.title.valid}
              touched={postForm.title.touched}
              value={postForm.title.value}
            />
            <FilePicker
              id="image"
              label="Image"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler}
              valid={postForm.image.valid}
              touched={postForm.image.touched}
            />
            <div className="new-post__preview-image">
              {!imagePreview && <p>Please choose an image.</p>}
              {imagePreview && <Image imageUrl={imagePreview} contain left />}
            </div>
            <Input
              id="content"
              label="Content"
              control="textarea"
              rows="5"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler}
              valid={postForm.content.valid}
              touched={postForm.content.touched}
              value={postForm.content.value}
            />
          </form>
        </Modal>
      </>
    ) : null;
  }
}

export default FeedEdit;
