import dataTamul from "./data.json" assert {type: 'json'};
const jobs_container = document.querySelector(".job_cards");
const filter_section = document.querySelector(".filter_section");
const filter_tags = document.querySelector(".filter_tags");
let jobList;

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((job) => {
      // job.tags = job.tools.concat(job.languages, job.role, job.level);
      job.tags = [job.role, job.level, ...job.languages, ...job.tools];
    });
    jobList = data;
    renderJobs(data);
  });

let tags = [];

jobs_container.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.hasAttribute(`data-filter`)) {
    if (tags.includes(clickedEl.dataset.filter)) return;
    tags.push(clickedEl.dataset.filter);
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.id = `${clickedEl.dataset.filter}`;
    tag.innerHTML = `
    <span class="tag_text">${clickedEl.dataset.filter}</span>
    <button class="tag_close_icon">
      <img class="tag_close_icon" src="images/icon-remove.svg" />
    </button>
    `;
    filter_tags.appendChild(tag);
    filter_section.style.opacity = 1;
    filter_section.style.pointerEvents = "auto";
    filterJobs();
  }
});

filter_section.addEventListener("click", (e) => {
  const clicked = e.target;
  if (clicked.id == "tags_clear_btn") {
    filter_tags.innerHTML = "";
    tags = [];
    closeFilterBox();
    renderJobs(jobList);
  } else if (clicked.classList.contains("tag_close_icon")) {
    const tag = clicked.closest("div");
    tag.remove();
    tags = tags.filter((tagStr) => tag.id != tagStr);
    if (tags.length == 0) {
      closeFilterBox();
      renderJobs(jobList);
    } else filterJobs();
  }
});

function renderJobs(jobs) {
  jobs_container.innerHTML = "";
  jobs.forEach((jobData) => {
    const article = document.createElement("article");
    const filter = jobData.tags
      .map((filter) => `<button data-filter="${filter}">${filter}</button>`)
      .join("");
    article.innerHTML = `
      <section class="company_info">
          <img src="${jobData.logo}" class="company_logo" />
          <div>
            <p>
              <span class="company_name">${jobData.company} </span>
              <span class="new ${jobData.new}"></span>
              <span class="featured ${jobData.featured}"></span>
            </p>
            <h3 class="job_title">${jobData.position}</h3>
            <p class="time_location_info">
              <span class="time_posted">${jobData.postedAt}</span>
              <span class="dot"></span>
              <span class="work_time">${jobData.contract}</span>
              <span class="dot"></span>
              <span class="work_location">${jobData.location}</span>
            </p>
          </div>
        </section>
        <section class="filter_tabs">
          ${filter}
        </section>
    `;
    jobs_container.appendChild(article);
  });
}
function filterJobs() {
  // checking if all the array of strings which represent the tags selected are found in an object property, if so the object has all the required taggings so it will show up
  const newJobList = jobList.filter((job) =>
    tags.every((tag) => job.tags.includes(tag))
  );
  renderJobs(newJobList);
}
function closeFilterBox() {
  filter_section.style.opacity = 0;
  filter_section.style.pointerEvents = "none";
}

/*
Changes to make:
-When any job object has the new and featured property true, add two span tag to indicate the highlights when you create the job card element from the object properties, for other objects that dont have dont create it when you add the element to DOM
*/
/*
Behaviour(multi-filtering: shows the object when it has all the tags added)
1. When document loads, render the jobs from the array.
2. When clicking on job card tags, add that tags only once to the tags section.
3. Now rerender the jobs based on the tag/tags added in the tags section. 
4. When clicking on tags section:
 - if clicked on clear button than clear everything and rerender the jobs
 - if clicked on tag close button, close the tag and job associated with it and:
   - if tags are all empty rerender the jobs
   - else filter by rerendering it

Continued Development: 
1. Ability to choose to single filtering mode(shows object when it has any of the tags)
*/
