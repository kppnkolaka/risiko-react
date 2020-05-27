import axios from 'axios';
import { sasaran } from '../api';

export const FetchSasaran = () => dispatch => {
  return axios({
    method: 'get',
    url: sasaran,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then( res => {
    return dispatch(FetchSasaranSuccess(res.data));
  });
}

const FetchSasaranSuccess = data => {
  return { type: 'FETCH_SASARAN_SUCCESS', data }
}