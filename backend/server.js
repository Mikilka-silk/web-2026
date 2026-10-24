const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let artworks = [
  {
    id: 1,
    title: "Квіти за тином",
    artist: "Катерина Білокур",
    style: "Наївне мистецтво",
    desc: "Неймовірна деталізація рослинного світу та гармонія кольорів.",
    price: 180,
    imageSrc: "/images/artists/bilokur/kvity_za_tinom.png",
    focus: "center 10%",
  },
  {
    id: 2,
    title: "Вечір Наближається",
    artist: "Олекса Новаківський",
    style: "Постімпресіонізм",
    desc: "Експресивний пейзаж, де динамічні, сміливі мазки та насичена кольорова гама передають емоційну напругу природи напередодні сутінків. Картина заворожує грою світла та тіні.",
    price: 210,
    imageSrc: "/images/artists/novakivskyi/vechir.png",
    focus: "center",
  },
  {
    id: 3,
    title: "Гора Грегіт",
    artist: "Олекса Новаківський",
    style: "Постімпресіонізм",
    desc: "Експресивні мазки та глибокий символізм, характерні для митця.",
    price: 240,
    imageSrc: "/images/artists/novakivskyi/gora_gregit.png",
    focus: "center 10%",
  },
  {
    id: 4,
    title: "Осінь",
    artist: "Катерина Білокур",
    style: "Наївне мистецтво",
    desc: "Справжнє свято врожаю та барв. Багатство осінніх дарів природи передано з такою любов'ю та майстерністю, що картина здається живою, випромінюючи тепло останніх сонячних днів.",
    price: 160,
    imageSrc: "/images/artists/bilokur/autum.png",
    focus: "center",
  },
  {
    id: 5,
    title: "Дівчина в червоному капелюсі",
    artist: "Олександр Мурашко",
    style: "Реалізм",
    desc: "Шедевр українського портретного живопису початку XX століття.",
    price: 250,
    imageSrc: "/images/artists/murashko/divchyna_murashko.webp",
    focus: "center 20%",
  },
  {
    id: 6,
    title: "Продавчині квітів",
    artist: "Олександр Мурашко",
    style: "Реалізм",
    desc: "Яскрава жанрова сцена, сповнена світла та життя. Насичений колорит і невимушені пози дівчат створюють атмосферу радісного вуличного життя, поєднуючи класичний реалізм з імпресіоністичною легкістю.",
    price: 220,
    imageSrc: "/images/artists/murashko/flower-sellers.png",
    focus: "center",
  },
  {
    id: 7,
    title: "Хата в Богданівці",
    artist: "Катерина Білокур",
    style: "Наївне мистецтво",
    desc: "Теплий та душевний пейзаж, що зображує рідну хату художниці. Робота дихає любов'ю до рідної землі, а кожен листочок і квітка виписані з характерною для авторки феноменальною деталізацією та трепетом.",
    price: 120,
    imageSrc: "/images/artists/bilokur/hata_bilokur.webp",
    focus: "center",
  },
  {
    id: 8,
    title: "Праля",
    artist: "Олександр Мурашко",
    style: "Реалізм",
    desc: "Глибоко психологічне полотно, що зображує просту жінку за роботою. Майстерна гра світла, що падає з вікна, підкреслює гідність, спокій та красу повсякденної людської праці.",
    price: 195,
    imageSrc: "/images/artists/murashko/pralya.png",
    focus: "center 20%",
  },
  {
    id: 9,
    title: "Собор Св. Юра",
    artist: "Олекса Новаківський",
    style: "Постімпресіонізм",
    desc: "Знакова робота митця, на якій величний львівський собор постає не просто як архітектурна споруда, а як живий, пульсуючий символ духовності. Виконана у фірмовій експресивній манері з використанням контрастних барв.",
    price: 240,
    imageSrc: "/images/artists/novakivskyi/sobor.png",
    focus: "center",
  },
];

// GET
app.get("/api/artworks", (req, res) => {
  const searchQuery = req.query.search;
  const styleQuery = req.query.style;

  let filteredArtworks = [...artworks];

  // ПОШУК ПО ТЕКСТУ
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredArtworks = filteredArtworks.filter(
      (art) =>
        art.title.toLowerCase().includes(q) ||
        art.artist.toLowerCase().includes(q),
    );
  }

  // ПОШУК ПО СТИЛЮ
  if (styleQuery) {
    filteredArtworks = filteredArtworks.filter(
      (art) => art.style === styleQuery,
    );
  }

  // РОБИМО ВИГЛЯД НІБИ ШОСЬ ГРУЗИМО (ДЛЯ ЛОАДЕРА)
  setTimeout(() => {
    res.json(filteredArtworks);
  }, 800);
});

// ОТРИМУЄМ 1 КАРТИНУ ПО АЙДІ
app.get("/api/artworks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const artwork = artworks.find((art) => art.id === id);

  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404).json({ message: "Картину не знайдено" });
  }
});

app.listen(PORT, () => {
  console.log(`Бекенд галереї працює на http://localhost:${PORT}/api/artworks`);
});
