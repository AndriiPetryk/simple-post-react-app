import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';

const errorHandler = ({ onHandle, error }) => (
  <>
    {error && <Backdrop onClick={onHandle} />}
    {error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={onHandle}
        onAcceptModal={onHandle}
        acceptEnabled
      >
        <p>{error.message}</p>
      </Modal>
    )}
  </>
);

errorHandler.propTypes = {
  onHandle: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default errorHandler;
