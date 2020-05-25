import axios from 'axios';
import { risiko } from '../api';

export const FetchRisiko = () => dispatch => {
  return axios({
    method: 'get',
    url: risiko,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return dispatch(FetchRisikoSuccess(res.data));
  }).catch(err => {
    return dispatch(FetchRisikoFailed(err));
  })
}

const FetchRisikoSuccess = data => {
  return { type: 'FETCH_RISIKO_SUCCESS', data };
}

const FetchRisikoFailed = err => {
  return { type: 'FETCH_RISIKO_FAILED', err };
}