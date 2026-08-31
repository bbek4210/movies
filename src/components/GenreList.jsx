function GenreList({ genres, selectedGenre, onGenreClick }) {
  return (
    <section className="genres-section" id="genres">
      <div className="section-title">
        <h2>Browse Genres</h2>
      </div>

      <div className="genre-list">
        <button
          className={!selectedGenre ? "active-genre" : ""}
          onClick={() => onGenreClick(null)}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            className={
              selectedGenre === genre.id ? "active-genre" : ""
            }
            onClick={() => onGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default GenreList;