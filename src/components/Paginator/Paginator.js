import React from 'react';
import PropTypes from 'prop-types';

import './Paginator.css';

const paginator = ({ children, currentPage, onPrevious, lastPage, onNext }) => (
  <div className="paginator">
    {children}
    <div className="paginator__controls">
      {currentPage > 1 && (
        <button
          type="button"
          className="paginator__control"
          onClick={onPrevious}
        >
          Previous
        </button>
      )}
      {currentPage < lastPage && (
        <button type="button" className="paginator__control" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  </div>
);

paginator.propTypes = {
  children: PropTypes.node.isRequired.isRequired,
  currentPage: PropTypes.number.isRequired.isRequired,
  lastPage: PropTypes.number.isRequired.isRequired,
  onPrevious: PropTypes.func.isRequired.isRequired,
  onNext: PropTypes.func.isRequired.isRequired,
};

export default paginator;
