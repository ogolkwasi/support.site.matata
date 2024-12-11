document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-hero");
    const resultsContainer = document.getElementById("search-hero-results");
    let searchIndex = [];

    // Fetch the search index
    fetch('/search.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch search.json');
            return response.json();
        })
        .then(data => {
            searchIndex = data;
            console.log('Search index loaded:', searchIndex);
        })
        .catch(error => console.error('Error loading search index:', error));

    // Search functionality
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        resultsContainer.innerHTML = ''; // Clear previous results

        if (query.length > 0) {
            const results = searchIndex.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.summary.toLowerCase().includes(query) ||
                item.body.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                results.forEach(result => {
                    const li = document.createElement("li");
                    li.innerHTML = `<a href="${result.url}">${result.title}</a>`;
                    resultsContainer.appendChild(li);
                });
            } else {
                resultsContainer.innerHTML = '<li class="no-results">No results found</li>';
            }
        }
    });
});
