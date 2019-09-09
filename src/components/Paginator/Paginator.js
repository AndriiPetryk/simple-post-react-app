import React from 'react';

import './Paginator.css';

const paginator = props => {
  const { children, currentPage, onPrevious, lastPage, onNext } = props;
  return (
    <div className="paginator">
      {children}
      <div className="paginator__controls">
        {currentPage > 1 && (
          // eslint-disable-next-line react/button-has-type
          <button className="paginator__control" onClick={onPrevious}>
            Previous
          </button>
        )}
        {currentPage < lastPage && (
          // eslint-disable-next-line react/button-has-type
          <button className="paginator__control" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default paginator;
