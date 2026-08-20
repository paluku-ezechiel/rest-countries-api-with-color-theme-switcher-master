let code;
const btnBack = document.querySelector(".btn-back");
btnBack.addEventListener("click", () => {
  window.history.back();
});

/*
    <section class="items">
        <div class="item-image">
          <img src="https://flagcdn.com/af.svg" alt="drapeau" />
        </div>

        <div class="item-container">
          <div class="item-text">
            <div class="item-texte-element">
              <h2 class="title">Germany</h2>
              <p class="native-name">
                <strong>Native Name : </strong> <span>Deutschland</span>
              </p>
              <p class="population">
                <strong>Population : </strong> <span>83 240 525</span>
              </p>
              <p class="region"><strong>Region : </strong> <span>Europe</span></p>
              <p class="subRegion">
                <strong>Sub Region : </strong> <span>western Europe</span>
              </p>
              <p class="capital">
                <strong>Capital : </strong> <span>Berlin</span>
              </p>
            </div>

            <div class="item-top-level">
              <p class="domaine">
                <strong>Top Level Domaine : </strong> <span>.be</span>
              </p>
              <p class="currencies">
                <strong>Currencies : </strong> <span>Euro (£)</span>
              </p>
              <p class="language">
                <strong>Language : </strong> <span>Dutch, French, Germany</span>
              </p>
            </div>
          </div>

          <div class="border-countries">
            <strong>Border Countries : </strong>
            <span class="tag">France</span>
            <span class="tag">Germany</span>
            <span class="tag">Netherlands</span>
          </div>
        </div>
      </section>
*/

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
  spanCapital.textContent = `${countryElement.capital ? countryElement.capital : 'N/A'}`;

  const itemTopLevel = document.createElement("div");
  itemTopLevel.classList.add("item-top-level");

  const domaine = document.createElement("p");
  domaine.classList.add("domaine");

  const strongDomaine = document.createElement("strong");
  strongDomaine.textContent = "Top Level Domaine : ";

  const spanDomaine = document.createElement("span");
  spanDomaine.textContent = `${countryElement.topLevelDomain ? countryElement.topLevelDomain[0] : 'N/A'}`;

  const currencies = document.createElement("p");
  currencies.classList.add("currencies");

  const strongCurrencies = document.createElement("strong");
  strongCurrencies.textContent = "Currencies : ";

  const spanCurrencies = document.createElement("span");
  if(countryElement.currencies && countryElement.currencies.length > 0){
      const curr = countryElement.currencies[0];
      spanCurrencies.textContent = `${curr.name} (${curr.symbol})`;
  }else{
      spanCurrencies.textContent = "N/A";
  }

  const language = document.createElement("p");
  language.classList.add("language");

  const strongLanguage = document.createElement("strong");
  strongLanguage.textContent = "Language : ";

  const spanLanguage = document.createElement("span");
  if(countryElement.languages && countryElement.languages.length > 0){
      spanLanguage.textContent = `${countryElement.languages.map(lang => lang.name).join(", ")}`;
  }else{
      spanLanguage.textContent = 'N/A';
  }

  const borderCountries = document.createElement("div");
  borderCountries.classList.add("border-countries");

  const strongBorderCountries = document.createElement("strong");
  strongBorderCountries.textContent = "Border Countries :";

  if(countryElement.borders && countryElement.borders.length > 0){
      
  }

  const spanTag1 = document.createElement("span");
  spanTag1.classList.add("tag");
  spanTag1.textContent = `${countryElement}`

  nativeName.appendChild(strongNative, spanNative);
  population.appendChild(strongPopulation, spanPopulation);
  region.appendChild(strongRegion, spanRegion);
  subRegion.appendChild(strongSubRegion, spanSubRegion);
  capital.appendChild(strongCapital, spanCapital);
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
    const countriesArr = Array.isArray(countries) ? countries : [countries];
    const countryElement = countriesArr.find(
      (country) => country.alpha3Code === code
    );
    if (countryElement) {
      renderCountryDetails(countryElement);
    }
  } catch (error) {}
};

displayData();
