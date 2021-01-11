import React, {useReducer, useEffect} from "react";
import "../app.css"

import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const url = "https://www.omdbapi.com/?apikey=e439cbb3"

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
}

const reducer =(state,action)=> {
  switch(action.type){
    case"SEARCH_MOVIES_REQUEST":
      return (
        ...state,
        loading: true,
        errorMessage: null;
      );
      case "SEARCH_MOVIES_SUCCESS":
       return {
         ...state,
         loading: false,
         movies: action.payload
       };
     case "SEARCH_MOVIES_FAILURE":
       return {
         ...state,
         loading: false,
         errorMessage: action.error
       };
     default:
       return state;
   }
 };

const App =()=> {
  const {state, dispatch} = useReducer(reducer, initialState);

  useEffect(()=> {
    fetch(url)
      .then(response => respon.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        })
      });
  },[]);

  const search = searchValue => {
    dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});

        fetch(`${url}&s=${searchValue}`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
  };

  const { movies, errorMessage, loading } = state;

  return(
    <div className="App">
     <Header text="The Streamies" />
     <Search search={search} />
     <p className="App-intro">Nominate up to 5 of yopu favourite movies for the Streamies!</p>
     <div className="movies">
       {loading && !errorMessage ? (
         <span>loading...</span>
       ): errorMessage ?(
         <div className="errorMessage">{errorMessage}</div>
       ) : (
         movies.map((movie, index)=> (
           <Movie key={`${index}-${movie.Title}`} movie={movie} />
         ))
       )}
     </div>
    </div>
  );
};

export default App;
