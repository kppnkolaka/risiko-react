import { combineReducers } from 'redux';
import ui from './ui';
import referensi from './referensi';
import risiko from './risiko';

export default combineReducers({
  ui,
  referensi,
  risiko
});