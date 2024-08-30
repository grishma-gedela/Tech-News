const apiKey = '7e6752adcdfe4f32934f5bc5dfcf27b6';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`;

async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = ''; // Clear previous content

    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('article-item');

        const { title, description, url, urlToImage } = article;

        articleElement.innerHTML = `
            <h2><a href="${url}" target="_blank">${title}</a></h2>
            <p>${description}</p>
            <img src="${urlToImage}" alt="${title}">
        `;

        newsContainer.appendChild(articleElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchNews();

    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput').value;
        const searchUrl = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${apiKey}`;

        try {
            const response = await fetch(searchUrl);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error searching news:', error);
        }
    });
});
