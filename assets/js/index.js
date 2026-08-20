const countriesAllElement = document.querySelector(".countries");
const selectRegion = document.querySelector("#region-filter");
let filtrer = "";
let countries = [];
let recherche = "";

selectRegion.addEventListener("change", () => {
  filtrer = selectRegion.value;
  createCountriesElement(countries);
});

const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", () => {
  recherche = searchInput.value.trim().toLowerCase();
  createCountriesElement(countries);
});

const createNodesCountry = (country) => {
  const countriesElement = document.createElement("div");
  countriesElement.classList.add("countries-elements");

  const divCountries = document.createElement("div");
  divCountries.classList.add("image-country");

  const img = document.createElement("img");
  img.src = `${country.flags.png}`;
  img.alt = `${country.name}`;

  img.addEventListener("click", () => {
    location.assign("../../details.html");
  });

  const titleCountry = document.createElement("div");
  titleCountry.classList.add("title-country");

  const h2 = document.createElement("h2");
  h2.classList.add("title");
  h2.textContent = `${country.name}`;

  const population = document.createElement("p");
  population.classList.add("population");

  const strongPop = document.createElement("strong");
  strongPop.textContent = "Population : ";

  const spanPop = document.createElement("span");
  spanPop.textContent = `${
    typeof country.population === "number"
      ? country.population.toLocaleString()
      : country.population
  }`;

  const region = document.createElement("p");
  region.classList.add("region");

  const strongRegion = document.createElement("strong");
  strongRegion.textContent = "Region : ";

  const spanRegion = document.createElement("span");
  spanRegion.textContent = `${country.region}`;

  const capital = document.createElement("p");
  capital.classList.add("capital");

  const strongCapital = document.createElement("strong");
  strongCapital.textContent = "Capital : ";

  const spanCapital = document.createElement("span");
  spanCapital.textContent = `${country.capital}`;

  divCountries.appendChild(img);
  population.append(strongPop, spanPop);
  region.append(strongRegion, spanRegion);
  capital.append(strongCapital, spanCapital);

  titleCountry.append(h2, population, region, capital);

  countriesElement.append(divCountries, titleCountry);

  return countriesElement;
};

const createCountriesElement = (countries) => {
  const countriesArr = Array.isArray(countries) ? countries : [countries];
  const texteNodes = countriesArr
    .filter((pays) => {
      const matchRegion =
        !filtrer ||
        filtrer === "" ||
        filtrer.toLocaleLowerCase() === "all" ||
        pays.region.toLowerCase() === filtrer.toLowerCase();

      const matchPays = pays.name.toLowerCase().includes(recherche);

      return matchRegion && matchPays;
    })
    .map((country) => {
      return createNodesCountry(country);
    });

  if (!countriesAllElement) return;
  countriesAllElement.replaceChildren(...texteNodes);
};

const fetchAllCountries = async () => {
  const response = await fetch("./data.json");
  if (!response.ok) {
    throw new Error(`Erreur HTTP : (${response.status})`);
  }
  countries = await response.json();
  createCountriesElement(countries);
};

fetchAllCountries();
