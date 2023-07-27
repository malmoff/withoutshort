// Hämta nyhetsinnehåll från din Glitch-app
fetch("https://grandiose-strong-nephew.glitch.me/news")
  .then((response) => response.json())
  .then((data) => {
    // Använd nyhetsdatan för att visa innehållet på din sida
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
