// Hämta nyhetsinnehåll från din Glitch-app
fetch("https://DIN_GLITCH_APP_NAMN.glitch.me/news")
  .then((response) => response.json())
  .then((data) => {
    // Använd nyhetsdatan för att visa innehållet på din sida
    let mainHTML = "";
    data.forEach((article) => {
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
  })
  .catch((error) => {
    console.error("Error fetching news data:", error);
  });
