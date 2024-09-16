const apiKey = "2bfabc3d9c9c4a76ab1fd4870978800d";
const apiUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=";

let count = 0;

async function getNews(){
    try{
        const response = await fetch(apiUrl+apiKey);
        const data = await response.json();
        const articles = data.articles;
        // console.log(articles);
        if(response != 401){
            const title = document.querySelector(".title");
            title.innerHTML = articles[count].title;
            title.style.color = "red";
            const source = document.querySelector(".sourcenews");
            source.innerHTML = articles[count].source.name;
            const date = document.querySelector(".published");
            date.innerHTML = articles[count].publishedAt;
            const desc = document.querySelector(".description");
            desc.innerHTML = articles[count].description;

            const img = document.getElementById("newspic");
            if(articles[count].urlToImage != null){
                img.src = await articles[count].urlToImage;
                img.style.width = "455px";
            }else{
                img.src = "../images/No_Image-1024.webp";
                img.style.width = "455px";
                img.style.height = "300px";
                
                img.style.background = "white";
            }
        }
        
        document.querySelector(".sourcenews").style.display="block";
        document.querySelector(".published").style.display="block";
        document.querySelector(".description").style.display="block";
        document.getElementById("newspic").style.display="block";
        
    }catch(error){
        const title = document.querySelector(".title");
        title.innerHTML = "No Data Found";
        document.querySelector(".sourcenews").style.display="none";
        document.querySelector(".published").style.display="none";
        document.querySelector(".description").style.display="none";
        document.getElementById("newspic").style.display="none";

    }
    
    
}
getNews();
function prev(){
    if(count!=0){
        count--;
    }
    getNews();
    // console.log(count);
}
function next(){
    if(count>20){
        count=0;
    }
    count++;
    getNews();
    console.log(count);
}