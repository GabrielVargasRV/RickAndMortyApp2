import React, { useEffect, useState, useContext, useReducer } from "react";
import Character from "./Character.jsx";
import Loading from "./Loading.jsx";
import ThemeContext from "../context/ThemeContext.js";
import { Link } from "react-router-dom";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  const [info, setInfo] = useState({
    loading: false,
    error: null,
    next: "https://rickandmortyapi.com/api/character",
    characters: [],
  });
  const { theme } = useContext(ThemeContext);
  const classes = theme ? "dark" : "white";

  useEffect(() => {
    setInfo({ loading: true });
    try {
      loadCharacters();
    } catch (err) {
      setInfo({ loading: false, error: err });
    }
  }, []);

  const loadCharacters = () => {
    console.log(info.next);
    fetch(info.next)
      .then((res) => res.json())
      .then((data) =>
        setInfo({
          loading: false,
          next: data.info.next,
          characters: info.characters.concat(data.results),
        })
      );
  };

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  return (
    <div className={classes}>
      {favorites.favorites.length > 0 && (
        <div className="favorites-container">
          <h2>FAVORITES</h2>
          {favorites.favorites.map((f) => {
            return (
              <li key={f.id}>
                <Link className="link" to={`/${f.id}`}>{f.name}</Link>
              </li>
            );
          })}
        </div>
      )}

      <div className="Characters">
        {info.loading ? (
          <Loading />
        ) : (
          info.characters.map((c) => {
            return (
              <div>
                <Character character={c} handleClick={handleClick} />
                {/* <button type="button" onClick={() => handleClick(c)} >Add To Favorites</button> */}
              </div>
            );
          })
        )}
      </div>
      <button
        onClick={loadCharacters}
        type="button"
        className={theme ? "bDark" : "bWhite"}
      >
        Load More
      </button>
    </div>
  );
};

export default Characters;
