const apiKey = "2bfabc3d9c9c4a76ab1fd4870978800d";
const apiUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";
let count = 0;
let articles = [];

async function getNews() {
    document.getElementById("loading").style.display = "block";  // Show loading indicator
    
    try {
        const response = await fetch(apiUrl + apiKey);
        const data = await response.json();
        articles = data.articles;

        if (response.status === 200 && articles.length > 0) {
            updateNews();
        } else {
            showError();
        }
    } catch (error) {
        showError();
    }

    document.getElementById("loading").style.display = "none";  // Hide loading indicator
}

function updateNews() {
    const article = articles[count];
    document.querySelector(".title").innerHTML = article.title;
    document.querySelector(".sourcenews").innerHTML = article.source.name;
    
    const date = new Date(article.publishedAt);
    document.querySelector(".published").innerHTML = date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    
    document.querySelector(".description").innerHTML = article.description || "No description available.";

    const img = new Image();
    img.src = article.urlToImage || "../images/No_Image-1024.webp";
    img.onload = () => {
        const displayImg = document.getElementById("newspic");
        displayImg.src = img.src;
        displayImg.style.width = "455px";
    };
}

function prev() {
    if (count > 0) {
        count--;
        updateNews();
    }
}

function next() {
    if (count < articles.length - 1) {
        count++;
        updateNews();
    } else {
        count = 0;
        updateNews();
    }
}

function showError() {
    document.querySelector(".title").innerHTML = "No Data Found";
    document.querySelector(".sourcenews").style.display = "none";
    document.querySelector(".published").style.display = "none";
    document.querySelector(".description").style.display = "none";
    document.getElementById("newspic").style.display = "none";
}

getNews();
