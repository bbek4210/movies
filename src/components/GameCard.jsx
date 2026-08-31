import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <div className="game-image">
        <img
          src={
            game.background_image ||
            "https://via.placeholder.com/500x300?text=No+Image"
          }
          alt={game.name}
        />

        <div className="rating">
          ⭐ {game.rating || "N/A"}
        </div>
      </div>

      <div className="game-info">
        <h3>{game.name}</h3>

        <p>
          {game.released
            ? new Date(game.released).getFullYear()
            : "Unknown"}
        </p>
      </div>
    </Link>
  );
}

export default GameCard;