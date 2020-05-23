import axios from 'axios';
import { referensi } from '../api';

export const FetchReferensi = () => dispatch => {
  const kemungkinan = doFetch('kemungkinan');
  const dampak = doFetch('dampak');

  return Promise.all([kemungkinan, dampak]).then( response => {
    return dispatch(FetchReferensiSuccess(response));
  }).catch( error => {
    return dispatch(FetchReferensiFailed('something went wrong'));
  })
}

const doFetch =  kategori => {
  return axios({
    method: 'get',
    url: referensi + kategori,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then( response => {
    return response.data;
  });
}

const FetchReferensiSuccess = data => {
  return { type: 'FETCH_REFERENSI_SUCCESS', data }
}

const FetchReferensiFailed = err => {
  return { type: 'FETCH_REFERENSI_Failed', err }
}

export const SubmitReferensi = (method, kategori, data) =>  dispatch => {
  if(method === 'put') {
    data = {
      query: { level: data.level },
      data
    }
  }
  
  return axios({
    method,
    url: referensi + kategori,
    headers: {
      'Content-Type': 'application/json'
    },
    data
  }).then(response => {
    return dispatch(SubmitReferensiSuccess(response.data));
  }).catch(error => {
    return dispatch(SubmitReferensiFailed(error));
  });
}

const SubmitReferensiSuccess = data => {
  return { type: 'SUBMIT_REFERENSI_SUCCESS', data: data.status }
}

const SubmitReferensiFailed = err => {
  return { type: 'SUBMIT_REFERENSI_FAILED', err }
}