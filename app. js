
const categoryInfo = [
  { name: "Finance & FinTech", icon: "💳" },
  { name: "B2B SaaS, AI & Software", icon: "🤖" },
  { name: "Real Estate & Construction", icon: "🏗️" },
  { name: "Healthcare & MedTech", icon: "🏥" },
  { name: "Energy, EV & Infrastructure", icon: "⚡" },
  { name: "Manufacturing & Industrial Products", icon: "⚙️" },
  { name: "E-commerce & Retail", icon: "🛒" },
  { name: "Agriculture & Food Processing", icon: "🌱" },
  { name: "Education & Professional Services", icon: "🎓" },
  { name: "Logistics, Recycling & Environment", icon: "♻️" }
];

let businesses = [];
let saved = JSON.parse(localStorage.getItem("aw-saved") || "[]");
let showSavedOnly = false;

const businessGrid = document.getElementById("businessGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const savedFilter = document.getElementById("savedFilter");
const modal = document.getElementById("businessModal");
const modalBody = document.getElementById("modalBody");

function saveFavourites() {
  localStorage.setItem("aw-saved", JSON.stringify(saved));
  document.getElementById("savedCount").textContent = saved.length;
}

function renderCategories() {
  const grid = document.getElementById("categoryGrid");

  grid.innerHTML = categoryInfo.map((category, index) => {
    const count = businesses.filter(
      b => b.category === category.name
    ).length;

    return `
      <button class="category-card" data-category="${index}">
        <span>${category.icon}</span>
        <strong>${category.name}</strong>
        <small>${count} business concepts</small>
      </button>
    `;
  }).join("");

  grid.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
      categoryFilter.value =
        categoryInfo[Number(button.dataset.category)].name;
      renderBusinesses();
      document.getElementById("explore").scrollIntoView();
    });
  });

  categoryFilter.innerHTML =
    '<option value="all">All categories</option>' +
    categoryInfo.map(c =>
      `<option value="${c.name}">${c.name}</option>`
    ).join("");
}

function renderBusinesses() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  let results = businesses.filter(b => {
    const matchesSearch =
      `${b.name} ${b.category} ${b.description}`
        .toLowerCase().includes(query);

    const matchesCategory =
      category === "all" || b.category === category;

    const matchesSaved =
      !showSavedOnly || saved.includes(b.id);

    return matchesSearch && matchesCategory && matchesSaved;
  });

  if (sortFilter.value === "name") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    results.sort((a, b) => b.name.localeCompare(a.name));
  }

  document.getElementById("resultCount").textContent =
    `${results.length} business concepts found`;

  if (!results.length) {
    businessGrid.innerHTML =
      "<p>No businesses found. Try changing your search.</p>";
    return;
  }

  businessGrid.innerHTML = results.map(b => `
    <article class="business-card">
      <div class="business-top">
        <span class="category-tag">${escapeHTML(b.category)}</span>
        <button class="save-btn ${saved.includes(b.id) ? "saved" : ""}"
          data-save="${b.id}" aria-label="Save business">
          ${saved.includes(b.id) ? "★" : "☆"}
        </button>
      </div>

      <h3>${escapeHTML(b.name)}</h3>
      <p>${escapeHTML(b.description)}</p>

      <div class="card-bottom">
        <span>Research profile pending</span>
        <button class="view-link" data-view="${b.id}">
          Explore →
        </button>
      </div>
    </article>
  `).join("");

  businessGrid.querySelectorAll("[data-save]").forEach(button => {
    button.addEventListener("click", () => {
      toggleSaved(button.dataset.save);
    });
  });

  businessGrid.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      openBusiness(button.dataset.view);
    });
  });
}

function toggleSaved(id) {
  if (saved.includes(id)) {
    saved = saved.filter(item => item !== id);
  } else {
    saved.push(id);
  }

  saveFavourites();
  renderBusinesses();
}

function openBusiness(id) {
  const b = businesses.find(item => item.id === id);
  if (!b) return;

  modalBody.innerHTML = `
    <span class="eyebrow">${escapeHTML(b.category)}</span>
    <h2>${escapeHTML(b.name)}</h2>

    <p>${escapeHTML(b.description)}</p>

    <span class="detail-label">BUSINESS OVERVIEW</span>
    <p>${escapeHTML(b.overview || "Detailed overview is pending research.")}</p>

    <span class="detail-label">TARGET CUSTOMERS</span>
    <p>${escapeHTML(b.customers || "Customer research pending.")}</p>

    <span class="detail-label">BUSINESS MODEL</span>
    <p>${escapeHTML(b.model || "Operating model research pending.")}</p>

    <span class="detail-label">RESEARCH STATUS</span>
    <p>${escapeHTML(b.research_status || "Not yet verified")}</p>

    <div class="detail-warning">
      Educational concept only. Verify investment requirements,
      suppliers, market demand, permissions, taxes and other
      compliance obligations before making business decisions.
    </div>
  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "aw-theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

if (localStorage.getItem("aw-theme") === "light") {
  document.body.classList.add("light");
}

searchInput.addEventListener("input", renderBusinesses);
categoryFilter.addEventListener("change", renderBusinesses);
sortFilter.addEventListener("change", renderBusinesses);

savedFilter.addEventListener("click", () => {
  showSavedOnly = !showSavedOnly;
  savedFilter.textContent = showSavedOnly ? "★ Show all" : "★ Saved";
  renderBusinesses();
});

async function initialise() {
  try {
    const response = await fetch("data/businesses.json");

    if (!response.ok) {
      throw new Error("Could not load the business catalogue.");
    }

    businesses = await response.json();

    document.getElementById("totalCount").textContent =
      businesses.length;

    document.getElementById("categoryCount").textContent =
      categoryInfo.length;

    saveFavourites();
    renderCategories();
    renderBusinesses();

  } catch (error) {
    businessGrid.innerHTML = `
      <p>Unable to load the catalogue.
      Please check that data/businesses.json exists
      and run the project using a local web server.</p>
    `;
    document.getElementById("resultCount").textContent = error.message;
  }
}

initialise();
