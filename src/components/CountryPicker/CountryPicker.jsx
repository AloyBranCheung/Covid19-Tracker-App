import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
      <MenuItem key={uuidv4()} value={country}>
        {country}
      </MenuItem>
    );
  });

  const nativeSelectChangeHandler = (e) => {
    const countrySelected = e.target.value;
    const selectedCountry = countryObj.filter((eachObj) => {
      return eachObj.country === countrySelected;
    });
    const finalValue = selectedCountry[0].slug;
    onHandleCountryChange(finalValue);
  };

  return (
    <FormControl className={styles.formControl}>
      <Select defaultValue="Canada" onChange={nativeSelectChangeHandler}>
        <MenuItem value="Canada">Canada</MenuItem>
        {mappedCountries}
      </Select>
      <Button onClick={toggleHandler} variant="contained">
        Toggle
      </Button>
    </FormControl>
  );
}
