// Hämta nyhetsinnehåll från Glitch-app
fetch("https://grandiose-strong-nephew.glitch.me/news")
  .then((response) => response.json())
  .then((data) => {
    // Använd nyhetsdatan för att visa innehållet på sidan
    renderMain(data);
  })
  .catch((error) => {
    console.error("Error fetching news data:", error);
  });

// render news 
function renderMain(arr) {
  // Sort the articles based on the published date in descending order (newest first)
  arr.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  let mainHTML = "";
  arr.forEach((article) => {
    if (article.urlToImage) {
      mainHTML += `<div class="card">
                    <a href=${article.url}>
                      <img src=${article.urlToImage} lazy="loading" />
                      <h4>${article.title}</h4>
                      <div class="publishbyDate">
                        <p>${article.source.name}</p>
                        <span>•</span>
                        <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
                      </div>
                      <div class="desc">
                        ${article.description}
                      </div>
                    </a>
                  </div>`;
    }
  });

  document.querySelector("main").innerHTML = mainHTML;
}

function Search(query) {
  fetch(`https://grandiose-strong-nephew.glitch.me/news?query=${query}`)
    .then((response) => response.json())
    .then((data) => {
      renderMain(data);
    })
    .catch((error) => {
      console.error("Error fetching news data:", error);
    });
}

// Kategorilänkar
const categories = document.querySelectorAll("nav.desktop li");
categories.forEach((category) => {
  category.addEventListener("click", () => {
    const query = category.textContent.toLowerCase();
    Search(query);
  });
});

// Sökruta
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;
  Search(query);
});

// Sökruta för mobil
const searchFormMobile = document.getElementById("searchFormMobile");
searchFormMobile.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInputMobile").value;
  Search(query);
});

// Menyknapp för mobil
const menuBtn = document.querySelector(".menuBtn");
const mobileMenu = document.querySelector(".mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

