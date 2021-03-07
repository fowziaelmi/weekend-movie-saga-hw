import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('GET_DETAILS', getMovieDetail);
  yield takeEvery('ADD_MOVIE', addMovie);
  yield takeEvery('FETCH_GENRES', fetchAllGenres);
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get('/api/movie');
    console.log('get all:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch {
    console.log('get all error');
  }
}
// generator function for details
/*function* getMovieDetail(action) {
  try {
    const id = action.payload.id;
    const movie = yield axios.get(`/api/movie/${id}`);
    console.log('got a response for movie details', movie.data);
    yield put({ type: 'SET_DETAILS', payload: movie.data });
  } catch (err) {
    console.error('error in getting details', err);
  }
}*/
function* getMovieDetail(action) {
  try {
    const movieId = action.payload;
    const movie = yield axios.get(`/api/movie/${movieId}`);
    console.log('got a response on movie details:', movie.data);
    yield put({ type: 'SET_DETAILS', payload: movie.data });
  } catch {
    console.log('error on details');
  }
}

//get all the genres from the database
function* fetchAllGenres() {
  try {
    const genres = yield axios.get('/api/genre');
    console.log('get all:', genres.data);

    yield put({
      type: 'SET_GENRES',
      payload: genres.data,
    });
  } catch (err) {
    console.log('get all error', err);
  }
}

// axios call to add new movie to server
function* addMovie(action) {
  console.log('in add movie', action);
  yield axios.post('/api/movie', action.payload);
  // fetch latest data from server
  try {
    yield put({
      type: 'FETCH_MOVIES',
    });
  } catch (err) {
    console.log('error in adding movie', err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};
// Saga generator for movie details

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};
// Create a new store for the movie details
const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
};
// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
