import React, { useEffect, useState, useContext, useReducer,useMemo } from "react";
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
  const [search,setSearch] = useState('');

  const [info, setInfo] = useState({
    loading: false,
    error: null,
    next: "https://rickandmortyapi.com/api/character",
    characters: [],
    charactersLoad: false
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
          charactersLoad:true
        })
      );
  };

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const filteredCharacters = info.charactersLoad ? info.characters.filter((character) => {
    return character.name.toLowerCase().includes(search.toLowerCase());
  }) : info.characters

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

      <div className="search-container" >
        <h3>Search</h3>
        <input type="text" value={search} onChange={handleSearch} />
      </div>

      <div className="Characters">
        {info.loading ? (
          <Loading />
        ) : (
          filteredCharacters.map((c) => {
            return (
              <div>
                <Character key={c.id} character={c} handleClick={handleClick} />
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
