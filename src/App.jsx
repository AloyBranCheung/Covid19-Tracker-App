import { Cards, Chart, CountryPicker } from "./components/index";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("canada");
  const [isLine, setIsLine] = useState(false);

  useEffect(() => {
    const thisData = async () => {
      const covidData = await fetchData(selectedCountry);
      setData(covidData);
    };
    thisData();
  }, [selectedCountry]);

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    // fetch the data
    // set the state
  };

  const toggleHandler = () => {
    setIsLine((prevValue) => !prevValue);
  };

  return (
    <div className={styles.container}>
      <img src="https://i.ibb.co/7QpKsCX/image.png" alt="covid-header" />{" "}
      <Cards data={data} />
      <CountryPicker
        toggleHandler={toggleHandler}
        onHandleCountryChange={handleCountryChange}
      />
      <Chart toggle={isLine} selectedCountry={selectedCountry} />
    </div>
  );
}
