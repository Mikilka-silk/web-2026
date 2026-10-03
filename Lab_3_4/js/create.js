const form = document.getElementById("create-form");
const brandSelect = document.getElementById("brand");
const volumeInput = document.getElementById("volume");
const priceInput = document.getElementById("price");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const modalCloseBtn = document.getElementById("modal-close");

function calculatePrice() {
  const selectedOption = brandSelect.options[brandSelect.selectedIndex];

  if (!selectedOption || selectedOption.disabled) {
    priceInput.value = "";
    return;
  }

  const pricePerMl = parseFloat(
    selectedOption.getAttribute("data-price-per-ml"),
  );
  const volume = parseFloat(volumeInput.value);

  if (pricePerMl && volume) {
    priceInput.value = (pricePerMl * volume).toFixed(2);
  } else {
    priceInput.value = "";
  }
}

brandSelect.addEventListener("change", calculatePrice);
volumeInput.addEventListener("input", calculatePrice);

function showModal(title, message, isSuccess = false) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;

  if (isSuccess) {
    modalTitle.style.color = "#28a745";
  } else {
    modalTitle.style.color = "#d9534f";
  }

  modal.classList.remove("hidden");
}

function hideModal() {
  modal.classList.add("hidden");
}

modalCloseBtn.addEventListener("click", hideModal);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    let errorMessage = "Please check your inputs.\n";

    if (!brandSelect.value) {
      errorMessage += "- You must select a manufacturer.\n";
    }
    if (volumeInput.validity.valueMissing) {
      errorMessage += "- Volume is required.\n";
    } else if (volumeInput.validity.rangeUnderflow) {
      errorMessage += `- Volume must be at least ${volumeInput.min} ml.\n`;
    } else if (volumeInput.validity.rangeOverflow) {
      errorMessage += `- Volume cannot exceed ${volumeInput.max} ml.\n`;
    }

    showModal("Validation Error!", errorMessage);
    return;
  }

  const newPerfume = {
    id: Date.now(),
    manufacturer: brandSelect.value,
    volume: parseFloat(volumeInput.value),
    price: parseFloat(priceInput.value),
  };

  const existingPerfumes = JSON.parse(localStorage.getItem("perfumes")) || [];

  existingPerfumes.push(newPerfume);
  localStorage.setItem("perfumes", JSON.stringify(existingPerfumes));

  showModal(
    "Success!",
    `Perfume ${brandSelect.value} (${volumeInput.value}ml) was successfully added!`,
    true,
  );

  form.reset();

  priceInput.value = "";
});
