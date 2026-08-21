const mainElement = document.querySelector("main.main");
let code;
let countriesArr = [];
const modeDark = document.querySelector(".mode-dark");

modeDark.addEventListener("click", (event) => {
  event.currentTarget;
  document.body.classList.toggle("dark-mode");
});

const btnBack = document.querySelector(".btn-back");
btnBack.addEventListener("click", () => {
  window.history.back();
});

const renderCountryDetails = (countryElement) => {
  const section = document.createElement("section");
  section.classList.add("items");

  const itemImage = document.createElement("div");
  itemImage.classList.add("item-image");

  const img = document.createElement("img");
  img.src = `${countryElement.flags.svg}`;
  img.alt = `Drapeau de ${countryElement.name}`;

  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");

  const itemText = document.createElement("div");
  itemText.classList.add("item-text");

  const itemTextElement = document.createElement("div");
  itemTextElement.classList.add("item-texte-element");

  const h2 = document.createElement("h2");
  h2.classList.add("title");
  h2.textContent = `${countryElement.name}`;

  const nativeName = document.createElement("p");
  nativeName.classList.add("native-name");

  const strongNative = document.createElement("strong");
  strongNative.textContent = "Native name :";

  const spanNative = document.createElement("span");
  spanNative.textContent = `${countryElement.nativeName}`;

  const population = document.createElement("p");
  population.classList.add("population");

  const strongPopulation = document.createElement("strong");
  strongPopulation.textContent = "Population : ";

  const spanPopulation = document.createElement("span");
  spanPopulation.textContent = `${countryElement.population.toLocaleString()}`;

  const region = document.createElement("p");
  region.classList.add("region");

  const strongRegion = document.createElement("strong");
  strongRegion.textContent = "Region : ";

  const spanRegion = document.createElement("span");
  spanRegion.textContent = `${countryElement.region}`;

  const subRegion = document.createElement("p");
  subRegion.classList.add("subRegion");

  const strongSubRegion = document.createElement("strong");
  strongSubRegion.textContent = "Sub Region : ";

  const spanSubRegion = document.createElement("span");
  spanSubRegion.textContent = `${countryElement.subregion}`;

  const capital = document.createElement("p");
  capital.classList.add("capital");

  const strongCapital = document.createElement("strong");
  strongCapital.textContent = "Capital : ";

  const spanCapital = document.createElement("span");
  spanCapital.textContent = `${
    countryElement.capital ? countryElement.capital : "N/A"
  }`;

  const itemTopLevel = document.createElement("div");
  itemTopLevel.classList.add("item-top-level");

  const domaine = document.createElement("p");
  domaine.classList.add("domaine");

  const strongDomaine = document.createElement("strong");
  strongDomaine.textContent = "Top Level Domaine : ";

  const spanDomaine = document.createElement("span");
  spanDomaine.textContent = `${
    countryElement.topLevelDomain ? countryElement.topLevelDomain[0] : "N/A"
  }`;

  const currencies = document.createElement("p");
  currencies.classList.add("currencies");

  const strongCurrencies = document.createElement("strong");
  strongCurrencies.textContent = "Currencies : ";

  const spanCurrencies = document.createElement("span");
  if (countryElement.currencies && countryElement.currencies.length > 0) {
    const curr = countryElement.currencies[0];
    spanCurrencies.textContent = `${curr.name} (${curr.symbol})`;
  } else {
    spanCurrencies.textContent = "N/A";
  }

  const language = document.createElement("p");
  language.classList.add("language");

  const strongLanguage = document.createElement("strong");
  strongLanguage.textContent = "Language : ";

  const spanLanguage = document.createElement("span");
  if (countryElement.languages && countryElement.languages.length > 0) {
    spanLanguage.textContent = `${countryElement.languages
      .map((lang) => lang.name)
      .join(", ")}`;
  } else {
    spanLanguage.textContent = "N/A";
  }

  const borderCountries = document.createElement("div");
  borderCountries.classList.add("border-countries");

  const strongBorderCountries = document.createElement("strong");
  strongBorderCountries.textContent = "Border Countries :";

  if (countryElement.borders && countryElement.borders.length > 0) {
    countryElement.borders.forEach((borderCode) => {
      const borderCountry = countriesArr.find(
        (country) => country.alpha3Code === borderCode
      );
      const borderName = borderCountry ? borderCountry.name : borderCode;

      const spanTag = document.createElement("span");
      spanTag.classList.add("tag");
      spanTag.textContent = `${borderName}`;

      spanTag.addEventListener("click", () => {
        location.assign(`/details.html?code=${borderCode}`);
      });

      borderCountries.appendChild(spanTag);
    });
  } else {
    const noBorders = document.createElement("span");
    noBorders.textContent = "None";
    borderCountries.appendChild(noBorders);
  }

  nativeName.append(strongNative, spanNative);
  population.append(strongPopulation, spanPopulation);
  region.append(strongRegion, spanRegion);
  subRegion.append(strongSubRegion, spanSubRegion);
  capital.append(strongCapital, spanCapital);
  domaine.append(strongDomaine, spanDomaine);
  currencies.append(strongCurrencies, spanCurrencies);
  language.append(strongLanguage, spanLanguage);
  itemTextElement.append(
    h2,
    nativeName,
    population,
    region,
    subRegion,
    capital
  );

  itemTopLevel.append(domaine, currencies, language);

  itemImage.appendChild(img);

  itemText.append(itemTextElement, itemTopLevel);
  itemContainer.append(itemText, borderCountries);
  section.append(itemImage, itemContainer);

  return section;
};

const displayData = async () => {
  try {
    const params = new URL(location.href);
    code = params.searchParams.get("code");
    const response = await fetch("../../data.json");
    if (!response.ok) {
      throw new Error("Erreur HTTP :", response.status);
    }

    const countries = await response.json();
    countriesArr = Array.isArray(countries) ? countries : [countries];
    const countryElement = countriesArr.find(
      (country) => country.alpha3Code === code
    );
    if (countryElement) {
      const countrySection = renderCountryDetails(countryElement);

      if (!mainElement) return;

      mainElement.replaceChildren(countrySection);
    }
  } catch (error) {
    console.error("Erreur lors de l'affichage :", error);
  }
};

displayData();
