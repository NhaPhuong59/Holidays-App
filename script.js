const API_KEY = "938fcff6-62af-42ae-8414-b8c241d62cda";

// Render Countries List--------------------------------------------
const getCountries = async () => {
  try {
    const url = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    // console.log("data", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderCountries = async () => {
  try {
    const data = await getCountries();
    const countriesList = document.getElementById("countries-list");
    const ulCountriesList = countriesList.children[2];
    ulCountriesList.innerHTML = "";
    data.countries.forEach((country, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${country.name}</div>
                <div>Code: ${country.code}</div>
            </div>`;
      ulCountriesList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};
document.getElementById("countries-list-btn").addEventListener("click", () => {
  renderCountries();
});

// Render Language List----------------------------------------------
const getLanguages = async () => {
  try {
    const url = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;
    //here is how we add a dynamic value (API KEY) to the url
    const res = await fetch(url);
    const data = await res.json();
    // console.log("data", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderLanguages = async () => {
  try {
    const data = await getLanguages();
    const languagesList = document.getElementById("languages-list");
    const ulLanguagesList = languagesList.children[2];
    ulLanguagesList.innerHTML = "";
    data.languages.forEach((languages, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${languages.name}</div>
                <div>Code: ${languages.code}</div>
            </div>`;
      ulLanguagesList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};
document.getElementById("languages-list-btn").addEventListener("click", () => {
  renderLanguages();
});

// Render Holiday------------------------------------------------------

const getHoliday = async () => {
  try {
    let month = document.getElementById("month-query").value;
    let day = document.getElementById("day-query").value;
    let language = document.getElementById("language-query").value;
    let search = document.getElementById("search-query").value;
    let country = document.getElementById("country-query").value;
    if (country === "" && !search) {
      country = "VN";
    }
    changeCountry(country);

    let urlQuery = "";
    if (month) {
      urlQuery += `&month=${month}`;
    }
    if (day && month) {
      urlQuery += `&day=${day}`;
    }
    if (language) {
      urlQuery += `&language=${language}`;
    }
    if (search) {
      urlQuery += `&search=${search}`;
      // country = "";
    }

    const url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&country=${country}&year=2021${urlQuery}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data); //have a look the retrieved data
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderHoliday = async () => {
  try {
    const data = await getHoliday();
    const holidaysList = document.getElementById("holidays-list");
    const ulHolidaysList = holidaysList.children[1];
    ulHolidaysList.innerHTML = "";
    data.holidays.forEach((holidays, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
      <div class="li-wrapper">
        <div class="li-title">${holidays.name}</div>
        <div class="li-text">${holidays.weekday.date.name} - ${
        holidays.date
      }</div>
      </div>`;
      ulHolidaysList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};
document.getElementById("holidays-btn").addEventListener("click", () => {
  renderHoliday();
});

const changeCountry = async (countryCheck) => {
  try {
    const data = await getCountries();
    const holidayList = document.getElementById("holidays-list");
    const ulHolidayList = holidayList.children[0];
    data.countries.forEach((countries, index) => {
      if (countries.code.toLowerCase() === countryCheck.toLowerCase()) {
        ulHolidayList.innerText = `Holidays of ${countries.name}`;
      }
    });
  } catch (err) {
    console.log("err", err);
  }
};
