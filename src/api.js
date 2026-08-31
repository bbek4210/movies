const API_KEY = "1b54477e352a42ca892b437e92bc87f8";
const BASE_URL = "https://api.rawg.io/api";

export const getGames = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=20`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
};

export const searchGames = async (search) => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(
      search
    )}&page_size=20`
  );

  if (!response.ok) {
    throw new Error("Failed to search games");
  }

  return response.json();
};

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  return response.json();
};

export const getGamesByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&genres=${genreId}&page_size=20`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genre games");
  }

  return response.json();
};

export const getGameDetails = async (gameId) => {
  const response = await fetch(
    `${BASE_URL}/games/${gameId}?key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game details");
  }

  return response.json();
};

export const getGameScreenshots = async (gameId) => {
  const response = await fetch(
    `${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch screenshots");
  }

  return response.json();
};