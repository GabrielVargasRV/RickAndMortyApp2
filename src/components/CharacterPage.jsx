import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading.jsx";
import ThemeContext from "../context/ThemeContext"

const CharacterPage = () => {
  const params = useParams();
  const [character, setCharacter] = useState({});
  const {theme,setTheme} = useContext(ThemeContext);
  const classes = theme ? "dark" : "white"
  const [info, setInfo] = useState({
    loading: false,
    error: null,
  });

  useEffect(() => {
    setInfo({ loading: true });
    try {
      fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setCharacter(data);
          setInfo({ loading: false });
        });
    } catch (err) {
      console.log(err);
      setInfo({ loading: false, error: err });
    }
  }, []);
  return (
    <div className={classes} >
      {info.loading ? (
        <Loading />
      ) : (
        <div>
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
          <p>{`Status: ${character.status === "Dead" ? "Dead💀" : "Alive💓"}`}</p>
          <p>{character.species}</p>
					<p>{character.gender}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterPage;
