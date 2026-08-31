import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  getGameDetails,
  getGameScreenshots,
} from "../api";

import Loading from "../components/Loading";

function GameDetails() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadGame();
  }, [id]);

  const loadGame = async () => {
    try {
      setLoading(true);

      const [gameData, screenshotData] = await Promise.all([
        getGameDetails(id),
        getGameScreenshots(id),
      ]);

      setGame(gameData);
      setScreenshots(screenshotData.results);
    } catch (error) {
      setError("Unable to load game details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !game) {
    return (
      <div className="error detail-error">
        <h2>Game not found</h2>
        <Link to="/" className="back-btn">
          ← Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div
        className="details-hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0,0,0,0.65),
            rgba(8,8,15,1)
          ), url(${game.background_image})`,
        }}
      >
        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

        <div className="details-content">
          <p className="details-label">GAME DETAILS</p>

          <h1>{game.name}</h1>

          <div className="game-meta">
            <span>⭐ {game.rating || "N/A"}</span>

            <span>
              📅{" "}
              {game.released
                ? game.released
                : "Unknown"}
            </span>

            <span>
              🎮 {game.playtime || 0} hours
            </span>
          </div>

          <p className="description">
            {game.description_raw ||
              "No description available."}
          </p>

          <div className="details-info">
            <div>
              <strong>Genres</strong>

              <p>
                {game.genres?.length
                  ? game.genres
                      .map((genre) => genre.name)
                      .join(", ")
                  : "N/A"}
              </p>
            </div>

            <div>
              <strong>Platforms</strong>

              <p>
                {game.platforms?.length
                  ? game.platforms
                      .map(
                        (item) =>
                          item.platform.name
                      )
                      .join(", ")
                  : "N/A"}
              </p>
            </div>

            <div>
              <strong>Developers</strong>

              <p>
                {game.developers?.length
                  ? game.developers
                      .map(
                        (developer) =>
                          developer.name
                      )
                      .join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="screenshots">
        <div className="section-header">
          <div>
            <p className="section-label">
              VISUALS
            </p>

            <h2>Screenshots</h2>
          </div>
        </div>

        {screenshots.length === 0 ? (
          <p>No screenshots available.</p>
        ) : (
          <div className="screenshots-grid">
            {screenshots.map((image) => (
              <img
                key={image.id}
                src={image.image}
                alt={game.name}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default GameDetails;