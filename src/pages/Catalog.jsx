import React, { useState } from "react";
import Tile from "../components/Tile";
import { artworks } from "../data/artworks";
import "../css/Catalog.css";

const Catalog = () => {
  // Стани для фільтрів та пошуку
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStyle, setFilterStyle] = useState("Всі");

  // Логіка фільтрації та пошуку
  const filteredArtworks = artworks.filter((art) => {
    // Перевірка пошуку (шукаємо по назві або художнику)
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.artist.toLowerCase().includes(searchTerm.toLowerCase());

    // Перевірка фільтру по стилю
    const matchesStyle = filterStyle === "Всі" || art.style === filterStyle;

    return matchesSearch && matchesStyle;
  });

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Галерея живопису</h1>

        <div className="filters-container">
          {/* Фільтр (Select) */}
          <select
            value={filterStyle}
            onChange={(e) => setFilterStyle(e.target.value)}
            className="filter-select"
          >
            <option value="Всі">Всі стилі</option>
            <option value="Наївне мистецтво">Наївне мистецтво</option>
            <option value="Реалізм">Реалізм</option>
            <option value="Постімпресіонізм">Постімпресіонізм</option>
          </select>

          {/* Пошук (Input) */}
          <input
            type="text"
            placeholder="Пошук за назвою чи автором..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Сітка товарів */}
      <div className="catalog-grid">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((art) => (
            <Tile
              key={art.id}
              id={art.id}
              title={art.title}
              desc={art.artist}
              imageSrc={art.imageSrc}
              price={art.price}
              focus={art.focus}
            />
          ))
        ) : (
          <p className="no-results">За вашим запитом нічого не знайдено.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
