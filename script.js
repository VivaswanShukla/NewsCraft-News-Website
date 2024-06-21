const API_KEY = "03df629f876c40d8a20ec446624a6f26";
const url = "https://newsapi.org/v2/everything?q=";
// const API_KEY_1 = "pub_4281443bb948ed8cde4a2df6c21fe4a4fb214";
// const url_1 = "https://newsdata.io/api/1/news?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // const res = await fetch(`${url_1}${query}&apikey=${API_KEY_1}`);
    const data = await res.json();
    // console.log(data);
    // bindData(data.articles);
    bindData(data.articles);
}
function bindData(articles){
    const card_container = document.getElementById("cards-container") ;
    const news_card_template = document.getElementById("template-news-card");

    card_container.innerHTML= '';

    articles.forEach(article => {
        if(!article.urlToImage){
            return;
        }
            
        const card_clone = news_card_template.content.cloneNode(true);
        fillData(card_clone, article);
        card_container.appendChild(card_clone);
    }); 
}
function fillData(card_clone, article){
    const news_img = card_clone.querySelector('#news-img');
    const news_title = card_clone.querySelector('#card-content-heading');
    const news_source = card_clone.querySelector('#card-content-source');
    const news_desc = card_clone.querySelector('#card-content-desc');

    news_img.src = article.urlToImage;
    news_title.innerHTML = article.title;
    news_desc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone: "Asia/Jakarta"
    });
    news_source.innerHTML = `${article.source.name} • ${date} `;
    card_clone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
let selected_nav = null;

function onNavClick(id){
    fetchNews(id);
    const nav_item = document.getElementById(id);
    selected_nav?.classList.remove('active');
    selected_nav = nav_item;
    selected_nav.classList.add('active');  
}

const button_text = document.getElementById('search-input');
const button_search = document.getElementById('search-button');

button_search.addEventListener('click', () => {
    const query = button_text.value;
    if(!query) return;
    fetchNews(query);
    selected_nav?.classList.remove('active');
    selected_nav = null;
});