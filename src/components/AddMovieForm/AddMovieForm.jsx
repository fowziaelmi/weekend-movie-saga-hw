import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
function AddMovieForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');

  return (
    <div>
      {' '}
      Add movie form here
      <form>
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
        <button>Add!</button>
      </form>
    </div>
  );
}

export default AddMovieForm;
