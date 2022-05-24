import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";
import FavoriteContext from "../contexts/favoritesContext";

const { useContext } = React;

const Pokedex = (props) => {
    const { pokemons, page, setPage, total, loading } = props
    const { favoritePokemons } = useContext(FavoriteContext)

    const lastPage = () => {
        const nextPage = Math.max(page - 1, 0)
        setPage(nextPage)
    }

    const nextPage = () => {
        const nextPage = Math.min(page + 1, total)
        setPage(nextPage)
    }

    return (
        <div>
            <div className=" flex flex-row justify-between items-center p-2">
            <div className=" p-2 ">❤️ Favorites {favoritePokemons.length}</div>
                <Pagination page={page + 1} totalPages={total} onLeftClick={lastPage} onRightClick={nextPage} />
            </div>
            {loading ?
                <div>Loading Pokemon...</div>
                :
                <div className=" grid gap-4 grid-cols-5">
                    {pokemons.map((pokemon, idx) => {
                        return (
                            <Pokemon pokemon={pokemon} key={pokemon.name} />
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Pokedex;