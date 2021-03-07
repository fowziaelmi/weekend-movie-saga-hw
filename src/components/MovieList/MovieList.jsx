import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom';
function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  // create handle to switch to details page when movie is clicked and calls detail
  const showDetails = (thisMovie) => {
    console.log('in show details', thisMovie);

    dispatch({
      type: 'GET_DETAILS',
      payload: thisMovie,
    });
    history.push('/details');
  };
  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.id} onClick={() => showDetails(movie.id)}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={movie.title} />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
