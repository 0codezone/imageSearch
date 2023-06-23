const accessKey = "iOCN2jJm5C613AK1AvuMmkT6lrz_CL3QVGQcjHjY1UU";
const formEle = document.querySelector("form");
const inputEle = document.getElementById("searchInput");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("showMore-btn");
let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEle.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Request failed with status code: " + response.status);
    }
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    page++;
    showMore.style.display = "block";
  } catch (error) {
    console.error("Error:", error.message);
  }
}

formEle.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
