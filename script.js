document.addEventListener("DOMContentLoaded", () => {
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
  const searchBar = document.getElementById("search-bar");
  const clearBtn = document.getElementById("clear-btn");
  let activeFilters = [];

  function createJobCard(job) {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");

    jobCard.innerHTML = `
          <div class="job-details">
              <div class="job-logo">
                  <img src="${job.logo}" alt="${job.company} Logo">
              </div>
              <div class="job-info">
                  <div class="company">
                      <h3>${job.company}</h3>
                      ${job.new ? `<span class="new">NEW!</span>` : ""}
                      ${
                        job.featured
                          ? `<span class="featured">FEATURED</span>`
                          : ""
                      }
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
              ${job.tags
                .map((tag) => `<span class="tag">${tag}</span>`)
                .join("")}
          </div>
      `;
    return jobCard;
  }

  function renderJobListings(filteredJobs) {
    jobListingsContainer.innerHTML = "";
    filteredJobs.forEach((job) => {
      const jobCard = createJobCard(job);
      jobListingsContainer.appendChild(jobCard);
    });
  }

  function updateJobListings() {
    const searchFilter = searchBar.value.toLowerCase();

    const filteredJobs = jobListings.filter((job) => {
      const jobTitle = job.title.toLowerCase();
      const company = job.company.toLowerCase();
      const category = job.category.toLowerCase();
      const tags = job.tags.map((tag) => tag.toLowerCase());

      const matchesSearch =
        jobTitle.includes(searchFilter) ||
        company.includes(searchFilter) ||
        category.includes(searchFilter) ||
        tags.some((tag) => tag.includes(searchFilter));

      const matchesTags = activeFilters.every((filter) =>
        tags.includes(filter)
      );

      return matchesSearch && matchesTags;
    });

    renderJobListings(filteredJobs);
  }

  searchBar.addEventListener("input", updateJobListings);

  clearBtn.addEventListener("click", () => {
    searchBar.value = "";
    activeFilters = [];
    selectedFilters.innerHTML = "";
    updateJobListings();
  });

  renderJobListings(jobListings);
});
