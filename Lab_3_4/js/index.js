const priceRates = {
  Chanel: 2.5,
  Dior: 2.0,
  Armani: 1.8,
  "Tom Ford": 5.0,
  Gucci: 1.2,
  Versace: 1.22,
};

let initialPerfumes = JSON.parse(localStorage.getItem("perfumes")) || [];
const itemsGrid = document.getElementById("items-grid");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");
const sortToggle = document.getElementById("sort-toggle");
const totalValue = document.getElementById("total-value");
const countBtn = document.getElementById("count-btn");

const editModal = document.getElementById("edit-modal");
const editBrandSelect = document.getElementById("edit-brand");
const editVolumeInput = document.getElementById("edit-volume");
const saveEditBtn = document.getElementById("save-edit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
let currentEditId = null;

const infoModal = document.getElementById("info-modal");
const infoModalTitle = document.getElementById("info-modal-title");
const infoModalMessage = document.getElementById("info-modal-message");
const infoModalClose = document.getElementById("info-modal-close");

function showInfoModal(title, message, isError = true) {
  infoModalTitle.textContent = title;
  infoModalMessage.textContent = message;
  infoModalTitle.style.color = isError
    ? "var(--danger-color)"
    : "var(--primary-color)";
  infoModal.classList.remove("hidden");
}

infoModalClose.addEventListener("click", () => {
  infoModal.classList.add("hidden");
});

function renderCards(perfumes) {
  itemsGrid.innerHTML = "";

  if (perfumes.length === 0) {
    itemsGrid.innerHTML = `
      <div class="empty-state">
          <h2>No perfumes found</h2>
          <p>Try adjusting your search or add a new fragrance.</p>
          <a href="create.html" class="btn btn--blue btn--large">Create New Perfume</a>
      </div>
    `;
    return;
  }

  const cardsHTML = perfumes
    .map((perfume) => {
      const imageName = perfume.manufacturer.toLowerCase().replace(/\s+/g, "-");

      return `
        <div class="card" data-id="${perfume.id}">
            <div class="card__img">
                <img src="images/${imageName}.png" alt="${perfume.manufacturer}" 
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/200x220?text=No+Image';">
            </div>
            <div class="card__body">
                <h3 class="card__title" style="font-family: 'Playfair Display', serif;">${perfume.manufacturer}</h3>
                <p class="card__desc" style="font-family: 'Montserrat', sans-serif;">
                    <strong>Volume:</strong> <span class="vol-text">${perfume.volume}</span> ml<br>
                    <strong>Price:</strong> $<span class="price-text">${perfume.price}</span>
                </p>
            </div>
            <div class="card__footer">
                <button class="btn btn--light-blue" onclick="editPerfume(${perfume.id})">Edit</button>
                <button class="btn btn--light-red" onclick="removePerfume(${perfume.id})">Remove</button>
            </div>
        </div>
      `;
    })
    .join("");

  itemsGrid.insertAdjacentHTML("beforeend", cardsHTML);
}

let displayPerfumes = [];

function applyFiltersAndRender() {
  displayPerfumes = [...initialPerfumes];
  const query = searchInput.value.toLowerCase().trim();

  if (query) {
    displayPerfumes = displayPerfumes.filter((p) =>
      p.manufacturer.toLowerCase().includes(query),
    );
  }

  if (sortToggle.checked) {
    displayPerfumes.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  renderCards(displayPerfumes);
}

searchBtn.addEventListener("click", applyFiltersAndRender);
sortToggle.addEventListener("change", applyFiltersAndRender);

countBtn.addEventListener("click", () => {
  if (displayPerfumes.length === 0) {
    showInfoModal(
      "Notice",
      "There are no perfumes currently displayed to count!",
      false,
    );
    totalValue.textContent = "0";
    return;
  }

  const totalPrice = displayPerfumes.reduce(
    (acc, p) => acc + parseFloat(p.price),
    0,
  );
  totalValue.textContent = totalPrice.toFixed(2);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  sortToggle.checked = false;
  applyFiltersAndRender();
});

window.removePerfume = function (id) {
  initialPerfumes = initialPerfumes.filter((perfume) => perfume.id !== id);
  localStorage.setItem("perfumes", JSON.stringify(initialPerfumes));
  applyFiltersAndRender();
};

window.editPerfume = function (id) {
  const perfume = initialPerfumes.find((p) => p.id === id);
  if (!perfume) return;

  currentEditId = id;
  editVolumeInput.value = perfume.volume;
  editBrandSelect.value = perfume.manufacturer;
  editModal.classList.remove("hidden");
};

saveEditBtn.addEventListener("click", () => {
  const newVolume = parseFloat(editVolumeInput.value);
  const newBrand = editBrandSelect.value;

  if (isNaN(newVolume) || newVolume < 10 || newVolume > 500) {
    showInfoModal(
      "Validation Error!",
      "Please enter a valid volume between 10 and 500 ml.",
      true,
    );
    return;
  }

  const perfumeIndex = initialPerfumes.findIndex((p) => p.id === currentEditId);

  initialPerfumes[perfumeIndex].volume = newVolume;
  initialPerfumes[perfumeIndex].manufacturer = newBrand;

  const rate = priceRates[newBrand] || 2.0;
  initialPerfumes[perfumeIndex].price = (newVolume * rate).toFixed(2);

  localStorage.setItem("perfumes", JSON.stringify(initialPerfumes));
  editModal.classList.add("hidden");

  applyFiltersAndRender();
});

applyFiltersAndRender();
