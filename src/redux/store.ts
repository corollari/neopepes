import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './rootReducer';
import { logger } from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: ['persist']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Use redux logger only when env is development
const isDev = process.env.NODE_ENV === 'development';
const middlewares = isDev ? [logger] : [];

export const store = createStore(
  // reducer
  persistedReducer,
  // enhancer
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
