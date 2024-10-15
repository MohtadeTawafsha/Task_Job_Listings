document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const clearBtn = document.getElementById("clear-btn");
  const jobCards = document.querySelectorAll(".job-card");
  const selectedFilters = document.getElementById("selected-filters");
  let activeFilters = [];

  // Function to update job listings based on search input and selected filters
  function updateJobListings() {
    const filter = searchBar.value.toLowerCase();
    jobCards.forEach((card) => {
      const jobTitle = card.querySelector("h2").textContent.toLowerCase();
      const company = card
        .querySelector(".company h3")
        .textContent.toLowerCase();
      const category = card.getAttribute("data-category").toLowerCase();
      const tags = Array.from(card.querySelectorAll(".tag")).map((tag) =>
        tag.textContent.toLowerCase()
      );

      const matchesFilter =
        jobTitle.includes(filter) ||
        company.includes(filter) ||
        category.includes(filter);
      const matchesTags = activeFilters.every((filter) =>
        tags.includes(filter)
      );

      if (matchesFilter && matchesTags) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Handle search bar input
  searchBar.addEventListener("input", updateJobListings);

  // Handle clear button
  clearBtn.addEventListener("click", () => {
    searchBar.value = "";
    activeFilters = [];
    selectedFilters.innerHTML = "";
    updateJobListings();
  });

  // Function to add a filter tag to the selected filters section
  function addFilter(tag) {
    if (!activeFilters.includes(tag)) {
      activeFilters.push(tag);
      const filterElement = document.createElement("span");
      filterElement.classList.add("selected-tag");
      filterElement.innerHTML = `${tag} <span class="remove-tag">X</span>`;
      selectedFilters.appendChild(filterElement);

      // Handle tag removal
      filterElement
        .querySelector(".remove-tag")
        .addEventListener("click", () => {
          activeFilters = activeFilters.filter((f) => f !== tag);
          filterElement.remove();
          updateJobListings();
        });

      updateJobListings();
    }
  }

  // Add event listener to job tag elements for filter click
  document.querySelectorAll(".tag").forEach((tagElement) => {
    tagElement.addEventListener("click", () => {
      const tag = tagElement.textContent.toLowerCase();
      addFilter(tag);
    });
  });
});
