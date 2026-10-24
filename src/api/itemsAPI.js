import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getArtworks = async (styleFilter = "") => {
  try {
    // Якщо є фільтр за стилем, передаємо його як URL-параметр (query param)
    const url = styleFilter
      ? `${BASE_URL}/artworks?style=${encodeURIComponent(styleFilter)}`
      : `${BASE_URL}/artworks`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Помилка при завантаженні картин:", error);
    throw error;
  }
};

export const getArtworkById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/artworks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Помилка при завантаженні картини з ID ${id}:`, error);
    throw error;
  }
};
