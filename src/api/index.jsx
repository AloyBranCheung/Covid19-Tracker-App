import axios from "axios";

// summary of global cases
export const fetchData = async (selectedCountry) => {
  let countrySelect = "";
  if (selectedCountry) {
    countrySelect = selectedCountry;
  }
  const url = `https://api.covid19api.com/summary`;

  try {
    const {
      data: { Countries },
    } = await axios.get(url);

    const selectedCountry = Countries.filter((country) => {
      return country.Slug === countrySelect;
    })[0];

    if (selectedCountry !== undefined) {
      return {
        Name: selectedCountry.Slug,
        TotalConfirmed: selectedCountry.TotalConfirmed,
        NewConfirmed: selectedCountry.NewConfirmed,
        TotalDeaths: selectedCountry.TotalDeaths,
        NewDeaths: selectedCountry.NewDeaths,
        Retrieved: selectedCountry.Date,
      };
    } else {
      return {
        Name: "No Data",
        TotalConfirmed: null,
        NewConfirmed: null,
        TotalDeaths: null,
        NewDeaths: null,
        Retrieved: null,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

// Canadian cases by type active, recovered, death etc. since day one
export const fetchDayOne = async (selectedCountry) => {
  let countrySelect = "";
  if (selectedCountry) {
    countrySelect = selectedCountry;
  }

  const url = `https://api.covid19api.com/dayone/country/${countrySelect}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {}
};

// list of country names
export const fetchCountries = async () => {
  const url = "https://api.covid19api.com/countries";

  try {
    const { data } = await axios.get(url);
    const modifiedData = data.map((country) => {
      return { country: country.Country, slug: country.Slug };
    });
    return modifiedData;
  } catch (error) {}
};
