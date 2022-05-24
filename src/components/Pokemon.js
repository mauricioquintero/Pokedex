import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoritesContext";

const Pokemon = (props) => {
    const { pokemon } = props;
    const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext)

    const redHeart = "❤️";
    const blackHeart = "🖤";
    const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart

    const clickHeart = (e) => {
        e.preventDefault();
        updateFavoritePokemons(pokemon.name);
    }

    return (
        <div className=" flex shadow-md shadow-gray-300 rounded">
            <div className="">
                <img className=" w-20 h-20 mr-4"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                />
            </div>
            <div className="flex flex-col justify-between flex-1">
                <div className=" flex flex-row justify-between items-center">
                    <h3 className=" capitalize font-bold text-lg">{pokemon.name}</h3>
                    <div className="">
                        #{pokemon.id}
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className=" flex">
                        {pokemon.types.map((type, idx) => {
                            return (
                                <div className=" m-2 capitalize" key={idx}>{type.type.name}</div>
                            )
                        })}
                    </div>
                    <button className=" hover:animate-pulse" onClick={clickHeart}>
                        <div>{heart}</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pokemon;