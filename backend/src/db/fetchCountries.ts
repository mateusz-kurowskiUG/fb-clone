import axios from "axios";
import type { INewCountry } from "../interfaces/Country";
import { testCountry } from "./testCountry";

interface INewCountryData {
  name: { common: string };
  flag: string;
  flags: { svg: string };
  translations: { pol: { common: string } };
  idd: { root: string; suffixes: string[] };
}

export const fetchCountries = async (): Promise<INewCountry[]> => {
  const response = await axios.get<INewCountryData[]>(
    "https://restcountries.com/v3.1/all"
  );
  return [
    ...response.data.map((country) => getCountryData(country)),
    testCountry
  ];
};

const getCountryData = (country: INewCountryData): INewCountry => {
  const { name, flag, flags, translations, idd } = country;
  const { root, suffixes } = idd;
  const { pol } = translations;
  const suffixesUndefined = suffixes === undefined || suffixes.length === 0;
  const rootUndefined = root === undefined;
  const countryObject: INewCountry = {
    name_eng: name.common,
    name_pol: pol.common,
    flag_emoji: flag,
    flag_svg: flags.svg,
    phone_code:
      suffixesUndefined && rootUndefined
        ? ""
        : suffixesUndefined
          ? root
          : `${root}${suffixes[0]}`
  };
  return countryObject;
};
