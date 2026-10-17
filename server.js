const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware (проміжні обробники)
app.use(cors()); // Дозволяє фронтенду робити запити до цього сервера (вирішує помилку CORS)
app.use(express.json()); // Дозволяє серверу розуміти формат JSON, який присилатиме фронтенд

// Наша імпровізована "база даних"
let items = [];

// 1. READ (Отримати всі елементи або пошук) - метод GET
app.get("/api/items", (req, res) => {
  const searchQuery = req.query.search; // Отримуємо параметр пошуку з URL

  if (searchQuery) {
    // Якщо є запит, фільтруємо базу даних на бекенді
    const filteredItems = items.filter((item) =>
      item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return res.json(filteredItems); // Відправляємо лише знайдені елементи
  }

  res.json(items); // Якщо пошуку немає, відправляємо всі елементи
});
// 2. CREATE (Створити новий) - метод POST
app.post("/api/items", (req, res) => {
  const newItem = {
    id: Date.now(), // Генеруємо унікальний ID на основі часу
    manufacturer: req.body.manufacturer, // Беремо дані, які прислав фронтенд
    volume: req.body.volume,
    price: req.body.price,
  };
  items.push(newItem); // Додаємо в масив
  res.status(201).json(newItem); // Відповідаємо створеним елементом
});

// 3. UPDATE (Оновити існуючий) - метод PUT
app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id); // Отримуємо ID з URL
  const index = items.findIndex((item) => item.id === id); // Шукаємо елемент у масиві

  if (index !== -1) {
    items[index] = { id: id, ...req.body }; // Оновлюємо дані
    res.json(items[index]);
  } else {
    res.status(404).json({ message: "Елемент не знайдено" });
  }
});

// 4. DELETE (Видалити) - метод DELETE
app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((item) => item.id !== id); // Залишаємо всі елементи, крім того, що видаляємо
  res.json({ message: "Успішно видалено" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер успішно запущено на http://localhost:${PORT}`);
});
