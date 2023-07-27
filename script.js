// Funktion för att hämta nyhetsdata baserat på kategori
async function fetchDataByCategory(category) {
  try {
    const response = await fetch(`https://grandiose-strong-nephew.glitch.me/news?category=${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return null;
  }
}

// Funktion för att rendera nyhetsinnehållet på sidan
function renderMain(arr) {
  if (!Array.isArray(arr)) {
    console.error("Invalid data format. Expected an array.");
    return;
  }

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

  const mainContainer = document.querySelector("main");
  if (mainContainer) {
    mainContainer.innerHTML = mainHTML;
  }
}

// Funktion för att hantera klick på kategorilänkar
function handleCategoryClick(category) {
  fetchDataByCategory(category)
    .then((data) => {
      if (data && Array.isArray(data)) {
        renderMain(data);
      } else {
        console.error("Invalid data format. Expected an array.");
      }
    })
    .catch((error) => {
      console.error("Error fetching news data:", error);
    });
}

// Eventlyssnare för kategorilänkar
document.querySelectorAll(".desktop nav li").forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.textContent.toLowerCase();
    handleCategoryClick(category);
  });
});

document.querySelectorAll(".mobile nav li").forEach((item) => {
  item.addEventListener("click", () => {
    const category = item.textContent.toLowerCase();
    handleCategoryClick(category);
    document.querySelector(".mobile").classList.add("hidden");
  });
});

// Initialisera sidan med alla nyheter
document.addEventListener("DOMContentLoaded", () => {
  fetchDataByCategory("all")
    .then((data) => {
      if (data && Array.isArray(data)) {
        renderMain(data);
      } else {
        console.error("Invalid data format. Expected an array.");
      }
    })
    .catch((error) => {
      console.error("Error fetching news data:", error);
    });
});

// Öppna och stäng mobilmenyn
const mobilemenu = document.querySelector(".mobile");
const menuBtn = document.querySelector(".menuBtn");
menuBtn.addEventListener("click", () => {
  mobilemenu.classList.toggle("hidden");
});

// Sökfunktion för nyheter
const searchBtn = document.getElementById("searchForm");
const searchBtnMobile = document.getElementById("searchFormMobile");
const searchInputMobile = document.getElementById("searchInputMobile");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    handleCategoryClick(query);
    searchInput.value = "";
  }
});

searchBtnMobile.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInputMobile.value.trim();
  if (query) {
    handleCategoryClick(query);
    searchInputMobile.value = "";
    document.querySelector(".mobile").classList.add("hidden");
  }
});
