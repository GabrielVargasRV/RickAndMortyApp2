import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../context/ThemeContext.js";
const Character = (props) => {
  const { theme } = useContext(ThemeContext);
  const classes = theme
    ? "characterDark Character link"
    : "whiteCharacter Character link";
  const { character, handleClick } = props;

  return (
    <div className={classes} >
      <div className="Character-container_img">
        <Link to={`/${character.id}`} >
          <img src={character.image} alt={character.name} />
        </Link>
      </div>
      <div>
        <p>{character.name}</p>
        <p>{`Status: ${character.status === "Dead" ? "Dead💀" : "Alive💓"}`}</p>
        <p>{character.species}</p>
        <button onClick={() => handleClick(character)} type="button">
          Add To Favorites
        </button>
      </div>
    </div>
  );
};

export default Character;
