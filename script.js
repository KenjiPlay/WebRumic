const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");
const year = document.querySelector("#year");

const commandSearch = document.querySelector("#commandSearch");
const categoryFilter = document.querySelector("#categoryFilter");
const commandCategories = [...document.querySelectorAll(".command-category")];

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
    });
  });
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function updateCommandFilters() {
  const query = normalizeText(commandSearch?.value || "");
  const selectedCategory = categoryFilter?.value || "all";

  for (const category of commandCategories) {
    const categoryName = category.dataset.category || "";
    const categoryMatches =
      selectedCategory === "all" || selectedCategory === categoryName;

    let visibleCards = 0;
    const cards = [...category.querySelectorAll(".command-card")];

    for (const card of cards) {
      const text = normalizeText(card.textContent);
      const searchMatches = !query || text.includes(query);
      const visible = categoryMatches && searchMatches;

      card.classList.toggle("is-hidden", !visible);

      if (visible) {
        visibleCards++;
      }
    }

    category.classList.toggle("is-hidden", visibleCards === 0);
  }
}

if (commandSearch) {
  commandSearch.addEventListener("input", updateCommandFilters);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", updateCommandFilters);
}

updateCommandFilters();