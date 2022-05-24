import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';

import { getPokemons, searchPokemon } from './api';
import { getPokemonData } from './api';
import { FavoriteProvider } from './contexts/favoritesContext';

const { useState, useEffect } = React;

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(["raichu"]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const localStorageKey = "favorite_pokemon";

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemons(25, 25 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false);
      setTotal(Math.ceil(data.count / 25))
      setNotFound(false);
    } catch (err) {

    }
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  }

  useEffect(() => {
    if (!searching) {
      loadFavoritePokemons();
    }
  }, [])

  useEffect(() => {
    fetchPokemons();
  }, [page])

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated)
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  }

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true)
    const result = await searchPokemon(pokemon);
    if (!result) {
      return setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
    }
    setLoading(false);
    setSearching(false)
  }

  return (
    <FavoriteProvider value={{ favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons }}>
      <div>
        <Navbar />
        <div>
          <Searchbar onSearch={onSearch} />
          {notFound ? (
            <div>No results.</div>
          ) : (
            <Pokedex pokemons={pokemons} page={page} setPage={setPage} total={total} loading={loading} />
          )}
        </div>
      </div>
    </FavoriteProvider>
  );
}

export default App;
