const countryInput = document.getElementById('countryInput');
const searchButton = document.getElementById('searchButton');
const countryInfo = document.getElementById('countryInfo');
const suggestions = document.getElementById('suggestions');

async function fetchCountries(countryName) {
    try {
        const url = `https://restcountries.com/v3.1/name/${countryName}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('Ошибка', error);
        return [];
    }
}

function showSuggestions(countries) {
    suggestions.innerHTML = '';
    countries.slice(0, 5).forEach(country => {
        const li = document.createElement('li');
        li.textContent = country.name.common;
        li.addEventListener('click', () => {
            countryInput.value = country.name.common;
            suggestions.innerHTML = ''
            displayCountryInfo(country);
        });
        suggestions.appendChild(li);
    });
}

function displayCountryInfo(country) {
    const currencyCode = Object.keys(country.currencies)[0];
    const currency = country.currencies[currencyCode];


    countryInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population.toLocaleString()}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Currency:</b> ${currency.name} (${currency.symbol})</p>
        <p><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>
    `;
    countryInfo.style.display = 'flex';
}

countryInput.addEventListener('input', async () => {
    const valuee = countryInput.value.toLowerCase().trim();
    if (valuee) {
        const countries = await fetchCountries(valuee);
        if (countries.length) {
            showSuggestions(countries);
        } else {
            suggestions.innerHTML = '';
        }
    } else {
        suggestions.innerHTML = '';
    }
});

searchButton.addEventListener('click', async () => {
    const valuee = countryInput.value.toLowerCase().trim();
    if (valuee) {
        const countries = await fetchCountries(valuee);
        if (countries.length) {
            displayCountryInfo(countries[0]);
        } else {
            countryInfo.innerHTML = '<p>Country not found.</p>';
            countryInfo.style.display = 'flex';
            countryInfo.style.alignItems = 'center';
        }
        suggestions.innerHTML = '';
    }
});