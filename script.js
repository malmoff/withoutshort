const API_KEY = "499d03534f224e8890dcd1f95376001c";
const url = "https://newsapi.org/v2/everything?q=";

async function fetchData(query) {
  try {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function initializePage() {
  try {
    const data = await fetchData("all");
    if (data && data.articles && Array.isArray(data.articles)) {
      renderMain(data.articles);
    } else {
      console.error("Invalid data format. Expected an array.");
    }
  } catch (error) {
    console.error("Error initializing page:", error);
  }
}

// Call the initializePage function to fetch data and render the content.
initializePage();

//menu btn
let mobilemenu = document.querySelector(".mobile")
let menuBtn = document.querySelector(".menuBtn")
let menuBtnDisplay = true;

menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden")
})


//render news 
function renderMain(arr) {
  if (!Array.isArray(arr)) {
    console.error("Invalid data format. Expected an array.");
    return;
  }

  let mainHTML = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].urlToImage) {
      mainHTML += `<div class="card">
                    <a href=${arr[i].url}>
                      <img src=${arr[i].urlToImage} lazy="loading" />
                      <h4>${arr[i].title}</h4>
                      <div class="publishbyDate">
                        <p>${arr[i].source.name}</p>
                        <span>•</span>
                        <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                      </div>
                      <div class="desc">
                        ${arr[i].description}
                      </div>
                    </a>
                  </div>`;
    }
  }

  document.querySelector("main").innerHTML = mainHTML;
}


const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile") 
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    renderMain(data.articles)

})
searchBtnMobile.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)
})


async function Search(query){
    const data = await fetchData(query)
    renderMain(data.articles)
}
