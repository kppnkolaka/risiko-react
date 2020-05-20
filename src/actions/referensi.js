import axios from 'axios';
import { referensi } from '../api';

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

export const FetchReferensi = () => dispatch => {
  const kemungkinan = doFetch('kemungkinan');
  const dampak = doFetch('dampak');

  return Promise.all([kemungkinan, dampak]).then( response => {
    return dispatch(FetchReferensiSuccess(response));
  }).catch( error => {
    return dispatch(FetchReferensiFailed('something went wrong'));
  })
  // return axios({
  //   method: 'get',
  //   url: referensi + 'kemungkinan',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }).then( response => {
  //   return dispatch(FetchReferensiSuccess(response.data));
  // }).catch( err => {
  //   return dispatch(FetchReferensiFailed(err.response.data));
  // })
}

const FetchReferensiSuccess = (data) => {
  return { type: 'FETCH_REFERENSI_SUCCESS', data }
}

const FetchReferensiFailed = (err) => {
  return { type: 'FETCH_REFERENSI_Failed', err }
}