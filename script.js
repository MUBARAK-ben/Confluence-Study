const filterPills = document.querySelectorAll(".filter-pill");
const searchInput = document.getElementById("resourceSearch");
const resourceCards = document.querySelectorAll(".resource-card");
const noResults = document.getElementById("noResults");
const bookmarkButtons = document.querySelectorAll(".bookmark-btn");

const sessionChecks = document.querySelectorAll(".session-check");
const checkedCountEl = document.getElementById("checkedCount");
const totalChecksEl = document.getElementById("totalChecks");

let activeTrack = "all";

function updateChecklistCount() {
  const total = sessionChecks.length;
  const checked = Array.from(sessionChecks).filter((box) => box.checked).length;
  if (checkedCountEl) checkedCountEl.textContent = String(checked);
  if (totalChecksEl) totalChecksEl.textContent = String(total);
}

function filterResources() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  resourceCards.forEach((card) => {
    const matchesTrack = activeTrack === "all" || card.dataset.track === activeTrack;
    const text = `${card.textContent} ${card.dataset.tags || ""}`.toLowerCase();
    const matchesQuery = !query || text.includes(query);

    const show = matchesTrack && matchesQuery;
    card.classList.toggle("hidden", !show);
    if (show) visible += 1;
  });

  noResults.hidden = visible > 0;
}

filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    filterPills.forEach((btn) => btn.classList.remove("active"));
    pill.classList.add("active");
    activeTrack = pill.dataset.track;
    filterResources();
  });
});

searchInput.addEventListener("input", filterResources);

bookmarkButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".resource-card");
    const isSaved = card.classList.toggle("saved");
    btn.textContent = isSaved ? "Saved ✓" : "Save";
  });
});

sessionChecks.forEach((box) => {
  box.addEventListener("change", updateChecklistCount);
});

updateChecklistCount();