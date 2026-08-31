import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import GenreList from "../components/GenreList";

import {
  getGames,
  searchGames,
  getGenres,
  getGamesByGenre,
} from "../api";
import Loading from "../components/loading";


function Home() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadGames();
    loadGenres();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getGames();
      setGames(data.results);
    } catch (error) {
      setError("Unable to load games. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (search) => {
    try {
      setLoading(true);
      setError("");
      setSearchText(search);
      setSelectedGenre(null);

      const data = await searchGames(search);

      setGames(data.results);
    } catch (error) {
      setError("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = async (genreId) => {
    try {
      setLoading(true);
      setError("");
      setSelectedGenre(genreId);
      setSearchText("");

      if (genreId === null) {
        const data = await getGames();
        setGames(data.results);
      } else {
        const data = await getGamesByGenre(genreId);
        setGames(data.results);
      }
    } catch (error) {
      setError("Unable to load genre games.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar onSearch={handleSearch} />

      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO GAMEFLIX</p>

          <h1>
            Discover Your
            <br />
            Next <span>Favorite Game</span>
          </h1>

          <p className="hero-description">
            Explore thousands of games, discover new adventures,
            and find your next gaming obsession.
          </p>

          <button
            className="explore-btn"
            onClick={() =>
              document
                .getElementById("games")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Games →
          </button>
        </div>
      </section>

      <GenreList
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreClick={handleGenreClick}
      />

      <main className="games-container" id="games">
        <div className="section-header">
          <div>
            <p className="section-label">
              {searchText ? "SEARCH RESULTS" : "DISCOVER"}
            </p>

            <h2>
              {searchText
                ? `Results for "${searchText}"`
                : selectedGenre
                ? "Games in this Genre"
                : "Popular Games"}
            </h2>
          </div>

          <span>{games.length} Games</span>
        </div>

        {Loading ? (
          <Loading />
        ) : error ? (
          <div className="error">
            <h3>⚠️ Something went wrong</h3>
            <p>{error}</p>

            <button onClick={loadGames}>Try Again</button>
          </div>
        ) : games.length === 0 ? (
          <div className="no-games">
            <h3>No games found</h3>
            <p>Try searching for another game.</p>
          </div>
        ) : (
          <div className="games-grid">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>

      <footer>
        <div className="footer-logo">
          Game<span>Flix</span>
        </div>

        <p>
          Discover games. Explore worlds. Play your way.
        </p>

        <p className="copyright">
          © 2026 GameFlix. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;