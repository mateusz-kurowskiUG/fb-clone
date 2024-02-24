import axios from "axios";
import type { ICountry } from "../interfaces/Country";

interface ICountryData {
  name: { common: string };
  flag: string;
  flags: { svg: string };
  translations: { pol: { common: string } };
  idd: { root: string; suffixes: string[] };
}

const fetchCountries = async (): Promise<ICountry[]> => {
  const response = await axios.get<ICountryData[]>(
    "https://restcountries.com/v3.1/all"
  );
  return response.data.map((country) => getCountryData(country));
};

const getCountryData = (country: ICountryData): ICountry => {
  const { name, flag, flags, translations, idd } = country;
  const { root, suffixes } = idd;
  const { pol } = translations;

  const countryObject: ICountry = {
    name_eng: name.common,
    name_pol: pol.common,
    flag_emoji: flag,
    flag_svg: flags.svg,
    phone_codes:
      suffixes === undefined || suffixes.length === 0
        ? root
        : `${root}${suffixes[0]}`
  };
  return countryObject;
};

fetchCountries().then((data) => {
  console.log(data);
});
