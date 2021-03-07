import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// will useSelector to get single movie detail from store that i havent set up yet

// will render the details on the DOM

function DetailsPage() {
  const movieInfo = useSelector((store) => store.movieDetails);

  console.log('details', movieInfo);
  return <></>;
}
export default DetailsPage;
