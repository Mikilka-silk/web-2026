import React, { useState, useEffect } from "react";
import Tile from "../components/Tile";
import "../css/Catalog.css";
import Loader from "../components/Loader";
import { getArtworks } from "../api/itemsAPI";

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStyle, setFilterStyle] = useState("");

  // USEEFFECT ДЛЯ ЗАГРУЗКИ СТИЛІВ КОМПОНЕНТІВ!!!
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getArtworks(filterStyle);
        setItems(data);
      } catch (error) {
        console.error("Не вдалося завантажити картини", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterStyle]);

  // ЛОКАЛЬНИЙ ПОШУК
  const filteredArtworks = items.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <main className="catalog-page">
      <div className="catalog-header">
        <h1>Каталог картин</h1>
        <div className="filters-container">
          <input
            type="text"
            placeholder="Пошук за назвою або автором..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterStyle}
            onChange={(e) => setFilterStyle(e.target.value)}
            className="filter-select"
          >
            <option value="">Всі стилі</option>
            <option value="Наївне мистецтво">Наївне мистецтво</option>
            <option value="Реалізм">Реалізм</option>
            <option value="Постімпресіонізм">Постімпресіонізм</option>
          </select>
        </div>
      </div>

      {/* УМОВНИЙ РЕНДЕРИНГ */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="catalog-grid">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((art) => <Tile key={art.id} {...art} />)
          ) : (
            <p className="no-results">За вашим запитом нічого не знайдено.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default Catalog;
