// Function to fetch the search index and perform the search
function performSearch() {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("search-results");

    // Clear previous results
    resultsContainer.innerHTML = "";

    if (searchInput === "") {
        return; // Don't search if the input is empty
    }

    // Fetch the search index (search.json)
    fetch("/search.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch search index.");
            }
            return response.json();
        })
        .then(data => {
            // Filter pages based on the search query
            const results = data.filter(page => {
                return (
                    page.title.toLowerCase().includes(searchInput) || // Search in title
                    page.description?.toLowerCase().includes(searchInput) || // Search in description (optional)
                    page.body?.toLowerCase().includes(searchInput) // Search in body
                );
            });

            // Display the results
            if (results.length > 0) {
                results.forEach(result => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="${result.permalink}" class="uk-link-reset">
                        <h4>${result.title}</h4>
                        <p>${result.description || "No description available"}</p>
                    </a>`;
                    resultsContainer.appendChild(listItem);
                });
            } else {
                resultsContainer.innerHTML = "<li>No results found</li>";
            }
        })
        .catch(error => {
            console.error("Error fetching or processing search index:", error);
            resultsContainer.innerHTML = "<li>Error performing search</li>";
        });
}
