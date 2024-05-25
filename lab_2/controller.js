document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("openModal");
  const modal = document.getElementById("myModal");
  const closeModalBtn = document.querySelector(".close");
  const saveContactBtn = document.getElementById("saveContact");
  const cardsContainer = document.getElementById("cardsContainer");
  const deleteBtn = document.querySelector(".button-delete");
  const editBtn = document.querySelector(".button-edit");
  let selectedCard = null;

  const openModal = () => {
    modal.style.display = "block";
  };

  const closeModal = () => {
    modal.style.display = "none";
    document.getElementById("modalTitle").textContent = "Додати новий пост";
    document.getElementById("modalName").value = "";
    document.getElementById("modalNumber").value = "";
    document.getElementById("modalPhoto").value = "";
    document.getElementById("editingRowId").value = "";
    selectedCard = null;
  };

  openModalBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  saveContactBtn.addEventListener("click", () => {
    const name = document.getElementById("modalName").value;
    const post = document.getElementById("modalNumber").value;
    const photo = document.getElementById("modalPhoto").value;

    if (!name.trim() || !post.trim() || !photo.trim()) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    if (selectedCard) {
      selectedCard.querySelector(".text-container h1").textContent = name;
      selectedCard.querySelector(".text-container h3").textContent = post;
      selectedCard.querySelector(".photo-container img").src = photo;
    } else {
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      newCard.innerHTML = `
          <div class="photo-container">
            <img src="${photo}" alt="Post Image" />
          </div>
          <div class="text-container">
            <h1>${name}</h1>
            <h3>${post}</h3>
          </div>
        `;
      newCard.addEventListener("click", () => {
        document
          .querySelectorAll(".card")
          .forEach((card) => card.classList.remove("selected"));
        newCard.classList.add("selected");
        selectedCard = newCard;
      });
      cardsContainer.appendChild(newCard);
    }

    closeModal();
  });

  deleteBtn.addEventListener("click", () => {
    if (selectedCard) {
      selectedCard.remove();
      selectedCard = null;
    } else {
      alert("Будь ласка, виберіть карточку для видалення.");
    }
  });

  editBtn.addEventListener("click", () => {
    if (selectedCard) {
      document.getElementById("modalTitle").textContent = "Редагувати пост";
      document.getElementById("modalName").value =
        selectedCard.querySelector(".text-container h1").textContent;
      document.getElementById("modalNumber").value =
        selectedCard.querySelector(".text-container h3").textContent;
      document.getElementById("modalPhoto").value = selectedCard.querySelector(
        ".photo-container img"
      ).src;
      openModal();
    } else {
      alert("Будь ласка, виберіть карточку для редагування.");
    }
  });
});
