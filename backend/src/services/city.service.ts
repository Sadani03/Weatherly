import citiesData from "../data/cities.json";

export interface City {
  CityCode: string;
  CityName: string;
  Temp?: string;
  Status?: string;
}

interface CitiesData {
  List: City[];
}

const data = citiesData as CitiesData;

export const getCities = (): City[] => {
  return data.List;
};

export const getCityCodes = (): string[] => {
  return data.List.map((city) => city.CityCode);
};