let data; // Declare a variable to store fetched data

// Fetch data from the JSON file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData; // Store fetched data
        console.log(data); // Log the fetched data
        // Display current time for each recommended country
        displayCurrentTime(data.countries);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Get references to search input, search button, and clear button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');

// Add click event listener to the search button
searchButton.addEventListener('click', function() {
    // Get the entered keyword and convert it to lowercase
    const keyword = searchInput.value.toLowerCase();

    // Check if the keyword matches any predefined categories
    if (keyword.includes('beach')) {
        displayResults('beaches');
    } else if (keyword.includes('temple')) {
        displayResults('temples');
    } else if (keyword.includes('country')) {
        displayResults('countries');
    } else {
        // If no match found, display error message
        displayErrorMessage('No matching category found.');
    }
});

// Function to display results for the specified category
function displayResults(category) {
    // Get the recommendations based on the category
    const recommendations = data[category];

    // Check if recommendations exist for the category
    if (recommendations && recommendations.length > 0) {
        // Prepare HTML to display recommendations
        let html = '';
        recommendations.forEach(recommendation => {
            html += `
                <div class="recommendation">
                    <h3>${recommendation.name}</h3>
                    <img src="${recommendation.imageUrl}" alt="${recommendation.name}">
                    <p>${recommendation.description}</p>
                </div>
            `;
        });

        // Display recommendations in the results section
        document.getElementById('results').innerHTML = html;
    } else {
        // If no recommendations found, display error message
        displayErrorMessage('No recommendations found.');
    }
}

// Function to display error message
function displayErrorMessage(message) {
    document.getElementById('results').innerHTML = `<p>${message}</p>`;
}

// Function to display current time for each recommended country
function displayCurrentTime(countries) {
    // Loop through each country
    countries.forEach(country => {
        // Get the current time for the country
        const options = { timeZone: country.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const currentTime = new Date().toLocaleTimeString('en-US', options);

        // Display the current time in the country
        console.log(`Current time in ${country.name}:`, currentTime);
    });
}

// Add click event listener to the clear button
clearButton.addEventListener('click', function() {
    // Clear the results section
    document.getElementById('results').innerHTML = '';
});
