document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const clearBtn = document.getElementById("clear-btn");
  const selectedFilters = document.getElementById("selected-filters");
  let activeFilters = [];

  // The job listings array
  const jobListings = [
    {
      company: "Photosnap",
      logo: "images/photosnap.svg",
      title: "Senior Frontend Developer",
      new: true,
      featured: true,
      posted: "1d ago",
      type: "Full Time",
      location: "USA Only",
      category: "frontend",
      tags: ["Frontend", "Senior", "HTML", "CSS", "JavaScript"],
    },
    {
      company: "Manage",
      logo: "images/manage.svg",
      title: "Backend Developer",
      new: true,
      featured: true,
      posted: "3d ago",
      type: "Part Time",
      location: "Remote",
      category: "backend",
      tags: ["Backend", "Junior", "Node.js", "Express"],
    },
    {
      company: "Account",
      logo: "images/account.svg",
      title: "Fullstack Developer",
      new: true,
      featured: true,
      posted: "5d ago",
      type: "Full Time",
      location: "Remote",
      category: "fullstack",
      tags: ["Fullstack", "Midweight", "React", "Sass"],
    },
    {
      company: "MyHome",
      logo: "images/myhome.svg",
      title: "Junior Frontend Developer",
      new: true,
      featured: true,
      posted: "5d ago",
      type: "Contract",
      location: "USA Only",
      category: "frontend",
      tags: ["Frontend", "Junior", "CSS", "JavaScript"],
    },
    {
      company: "Loop Studios",
      logo: "images/loop.svg",
      title: "Backend Developer",
      new: true,
      featured: true,
      posted: "7d ago",
      type: "Full Time",
      location: "Remote",
      category: "backend",
      tags: ["Backend", "Senior", "Ruby", "RoR"],
    },
  ];

  const jobListingsContainer = document.getElementById("job-listings");

  // Function to create a job card
  function createJobCard(job) {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");
    jobCard.setAttribute("data-category", job.category);

    jobCard.innerHTML = `
      <div class="job-details">
        <div class="job-logo">
          <img src="${job.logo}" alt="${job.company} Logo">
        </div>
        <div class="job-info">
          <div class="company">
            <h3>${job.company}</h3>
            ${job.new ? `<span class="new">NEW!</span>` : ""}
            ${job.featured ? `<span class="featured">FEATURED</span>` : ""}
          </div>
          <h2>${job.title}</h2>
          <ul class="job-meta">
            <li>${job.posted}</li>
            <li>${job.type}</li>
            <li>${job.location}</li>
          </ul>
        </div>
      </div>
      <div class="job-tags">
        ${job.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    `;

    jobListingsContainer.appendChild(jobCard);

    // Add click event to job tags for filtering
    jobCard.querySelectorAll(".tag").forEach((tagElement) => {
      tagElement.addEventListener("click", () => {
        const tag = tagElement.textContent.toLowerCase();
        addFilter(tag);
      });
    });
  }

  // Function to update job listings based on search input and selected filters
  function updateJobListings() {
    const filter = searchBar.value.toLowerCase();
    const jobCards = document.querySelectorAll(".job-card"); // Move this here so it selects after jobs are created
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

  // Dynamically generate job cards for all jobs
  jobListings.forEach((job) => createJobCard(job));

  // Handle search bar input
  searchBar.addEventListener("input", updateJobListings);

  // Handle clear button
  clearBtn.addEventListener("click", () => {
    searchBar.value = "";
    activeFilters = [];
    selectedFilters.innerHTML = "";
    updateJobListings();
  });
});
