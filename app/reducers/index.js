import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import exampleReducer from './example';
import CategoryReducer from './CategoryReducer';
import AreaReducer from './AreaReducer';
import LoggedInReducer from './LoggedInReducer';
import MenuReducer from './MenuReducer';
import ModalReducer from './ModalReducer';
console.log(exampleReducer)

const rootReducer = combineReducers({
  user: LoggedInReducer,
  categories: CategoryReducer,
  areas: AreaReducer,
  menuOpen: MenuReducer,
  modals: ModalReducer,
  routing: routerReducer,
  form: formReducer,
  exampleReducer,
});

export default rootReducer;
