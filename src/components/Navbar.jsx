import { useState } from "react";

function Navbar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      onSearch(search);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        Game<span>Flix</span>
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#games">Games</a>
        <a href="#genres">Genres</a>
      </div>

      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">🔍</button>
      </form>
    </nav>
  );
}

export default Navbar;