document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://gnews.io/api/v4/search?q=ratan%20tata&token=354099afd55515f182f03f0aad37b6c3';

    const newsContainer = document.getElementById('news-articles');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            newsContainer.innerHTML = ''; 
            if (data.articles && data.articles.length > 0) {
                const articlesToShow = data.articles.slice(0, 3);
                
                articlesToShow.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.className = 'news-article';

                    const title = document.createElement('h3');
                    title.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                    articleDiv.appendChild(title);

                    const description = document.createElement('p');
                    description.textContent = article.description || 'No description available.';
                    articleDiv.appendChild(description);

                    if (article.image) { 
                        const image = document.createElement('img');
                        image.src = article.image; 
                        image.alt = article.title;
                        articleDiv.appendChild(image);
                    }

                    newsContainer.appendChild(articleDiv);
                });
            } else {
                newsContainer.innerHTML = '<p>No news articles found.</p>';
            }
        })
        .catch(error => {
            newsContainer.innerHTML = '<p>Failed to load news articles. Please try again later.</p>';
            console.error('Error fetching news:', error);
        });
});
