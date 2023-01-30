const jobList = [
  {
    id: 1,
    company: "Photosnap",
    logo: "./images/photosnap.svg",
    new: true,
    featured: true,
    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 2,
    company: "Manage",
    logo: "./images/manage.svg",
    new: true,
    featured: true,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    languages: ["Python"],
    tools: ["React"],
  },
  {
    id: 3,
    company: "Account",
    logo: "./images/account.svg",
    new: true,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
  {
    id: 4,
    company: "MyHome",
    logo: "./images/myhome.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: "./images/loop-studios.svg",
    new: false,
    featured: false,
    position: "Software Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["Ruby", "Sass"],
  },
  {
    id: 6,
    company: "FaceIt",
    logo: "./images/faceit.svg",
    new: false,
    featured: false,
    position: "Junior Backend Developer",
    role: "Backend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK Only",
    languages: ["Ruby"],
    tools: ["RoR"],
  },
  {
    id: 7,
    company: "Shortly",
    logo: "./images/shortly.svg",
    new: false,
    featured: false,
    position: "Junior Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["HTML", "JavaScript"],
    tools: ["Sass"],
  },
  {
    id: 8,
    company: "Insure",
    logo: "./images/insure.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["Vue", "Sass"],
  },
  {
    id: 9,
    company: "Eyecam Co.",
    logo: "./images/eyecam-co.svg",
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Python"],
    tools: ["Django"],
  },
  {
    id: 10,
    company: "The Air Filter Company",
    logo: "./images/the-air-filter-company.svg",
    new: false,
    featured: false,
    position: "Front-end Dev",
    role: "Frontend",
    level: "Junior",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
];
/* concatenating all the tags to be used found in various properties of an
object into a single array, 
because that makes my life easier! */
jobList.forEach((job) => {
  job.tags = job.tools.concat(job.languages, job.role, job.level);
  job.test = [job.tools, job.role, job.level, job.languages]
});
console.log(jobList)

const card_container = document.querySelector(".job_cards");
const filter_section = document.querySelector(".filter_section");
const filter_tags = document.querySelector(".filter_tags");

function renderJobs(jobs) {
  card_container.innerHTML = "";
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
    card_container.appendChild(article);
  });
}
renderJobs(jobList);

let tags = [];
card_container.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.hasAttribute(`data-filter`)) {
    if (tags.includes(clickedEl.dataset.filter)) return;
    tags.push(clickedEl.dataset.filter);
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.id = `${clickedEl.dataset.filter}`;
    tag.innerHTML = `
    <span class="tag_text">${clickedEl.dataset.filter}</span>
    <button class="tag_close_icon tag_close_btn">
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
  const clickedEl = e.target;
  if (clickedEl.classList.contains("tag_close_icon")) {
    const tag = clickedEl.closest("div");
    tag.remove();
    tags = tags.filter((tagStr) => tag.id != tagStr);
    if (filter_tags.innerText == "") {
      closeFilterBox();
      renderJobs(jobList);
    } else filterJobs();
  } else if (clickedEl.classList.contains("tags_clear_btn")) {
    filter_tags.innerHTML = "";
    tags = [];
    closeFilterBox();
    renderJobs(jobList);
  }
});

function closeFilterBox() {
  filter_section.style.opacity = 0;
  filter_section.style.pointerEvents = "none";
}

function filterJobs() {
  const newJobList = jobList.filter((job) =>
    tags.every((tag) => job.tags.includes(tag))
  );
  renderJobs(newJobList);
}

/*
DONT READ THE CODE BELOW!
 Notice: Failed code and snippets, atleast it was able to filter an item based only of single tag :(
const newData = data.filter(d => tags.some(t => d.tags.includes(t)));
To see if all the strings in an array are found in an object
for (let prop in jobData) {
      if (jobData[prop] == tag) return jobData;
        if (jobData[prop].includes(tag)) return jobData;
      }
*/
