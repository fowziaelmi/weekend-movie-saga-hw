import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
function AddMovieForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [genre, setGenre] = useState('');

  //This doesnt work. ill make a new reducer to fetch all the genres from the database to create dropdown.
  /*useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);
  */

  useEffect(() => {
    dispatch({
      type: 'GET_GENRES',
    });
  }, []);

  const genres = useSelector((store) => store.genres);
  const addMovie = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'ADD_MOVIE',
      payload: {
        title,
        description,
        poster,
        genre,
      },
    });
  };
  // now that i have genres stored i can add genres selection
  return (
    <div>
      {' '}
      Add movie form here
      <form onSubmit={addMovie}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />

        <input
          type="text"
          value={poster}
          placeholder="Poster"
          onChange={(evt) => setPoster(evt.target.value)}
        />
        <select
          name="Genre"
          label="Pick a Genre"
          onChange={(evt) => setNewGenre(evt.target.value)}
          required
        >
          {genres.map((genre) => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>

        <button>Add!</button>
      </form>
    </div>
  );
}

export default AddMovieForm;
