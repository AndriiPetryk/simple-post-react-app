import 'isomorphic-fetch';

const CORS = {
  xhrFields: { withCredentials: true },
  crossDomain: true,
  mode: 'cors',
  credentials: 'include',
};

const HEADERS = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Simple-Post-Component': 'simple-react-post',
  },
};

const fetchConfig = {
  ...CORS,
  ...HEADERS,
};

const Fetch = {
  get: url => {
    return fetch(url, {
      ...fetchConfig,
      method: 'GET',
      dataType: 'json',
    });
  },
  post: (url, data) => {
    return fetch(url, {
      ...fetchConfig,
      method: 'POST',
      dataType: 'json',
      body: data,
    });
  },
  put: (url, data) => {
    return fetch(url, {
      ...fetchConfig,
      method: 'PUT',
      dataType: 'json',
      body: data,
    });
  },
  patch: (url, data) => {
    return fetch(url, {
      ...fetchConfig,
      method: 'PATCH',
      dataType: 'json',
      data,
    });
  },
  delete: url => {
    return fetch(url, {
      ...fetchConfig,
      method: 'DELETE',
    });
  },
};

export default Fetch;
