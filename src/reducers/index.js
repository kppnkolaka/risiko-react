import { combineReducers } from 'redux';
import ui from './ui';
import referensi from './referensi';
import risiko from './risiko';
import sasaran from './sasaran-organisasi';

export default combineReducers({
  ui,
  referensi,
  risiko,
  sasaran
});