import React, { useState, useEffect } from "react";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";

export default function CountryPicker({
  onHandleCountryChange,
  toggleHandler,
}) {
  const [countries, setCountries] = useState([]);
  const [countryObj, setCountryObj] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCountries();
      const sortedCountries = data.map((country) => country.country).sort();
      setCountries(sortedCountries);
      setCountryObj(data);
    };

    fetchData();
  }, [setCountries]);

  const mappedCountries = countries.sort().map((country) => {
    return (
      <option key={uuidv4()} value={country}>
        {country}
      </option>
    );
  });

  const nativeSelectChangeHandler = (e) => {
    const countrySelected = e.target.value;
    const selectedCountry = countryObj.filter((eachObj) => {
      return eachObj.country === countrySelected;
    });
    const finalValue = selectedCountry[0].slug;
    onHandleCountryChange(finalValue);
    return finalValue;
  };

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={nativeSelectChangeHandler}>
        <option value="canada">Canada</option>
        {mappedCountries}
      </NativeSelect>
      <Button onClick={toggleHandler} variant="contained">
        Toggle
      </Button>
    </FormControl>
  );
}
