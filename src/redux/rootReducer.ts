import { combineReducers } from 'redux';

import course from './course';
import persist from './persist';

export default combineReducers({
  course,
  persist
});
