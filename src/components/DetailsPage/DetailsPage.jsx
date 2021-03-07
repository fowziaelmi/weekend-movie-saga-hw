import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// will useSelector to get single movie detail from store that i havent set up yet

// will render the details on the DOM

function DetailsPage() {
  const movieInfo = useSelector((store) => store.movieDetails);

  console.log('details', movieInfo);

  //now i want to add the genre from the movie details

  return (
    <>
      <h3>{movieInfo.title}</h3>
      <img src={movieInfo.poster}></img>
      <p>{movieInfo.description}</p>
    </>
  );
}
export default DetailsPage;
