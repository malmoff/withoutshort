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

// Funktion för att visa/dölja rullgardinen på mobila enheter
function toggleMobileMenu() {
  const mobileMenu = document.querySelector(".mobile");
  mobileMenu.classList.toggle("hidden");
}

// Klickhändelse för att visa/dölja rullgardinen på mobila enheter
const menuBtn = document.querySelector(".menuBtn");
menuBtn.addEventListener("click", toggleMobileMenu);

// Kategorilänkar för mobila enheter
const mobileCategories = document.querySelectorAll(".mobile nav li");
mobileCategories.forEach((category) => {
  category.addEventListener("click", () => {
    toggleMobileMenu(); // Dölj rullgardinen efter att en kategori har valts
    const query = category.textContent.toLowerCase();
    Search(query);
  });
});

// Sökruta för mobila enheter
const searchFormMobile = document.getElementById("searchFormMobile");
searchFormMobile.addEventListener("submit", (e) => {
  e.preventDefault();
  toggleMobileMenu(); // Dölj rullgardinen efter att sökningen har skickats
  const query = document.getElementById("searchInputMobile").value;
  Search(query);
});

// Kategorilänkar för desktop
const categories = document.querySelectorAll("nav.desktop li");
categories.forEach((category) => {
  category.addEventListener("click", () => {
    const query = category.textContent.toLowerCase();
    Search(query);
  });
});

// Sökruta för desktop
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;
  Search(query);
});
