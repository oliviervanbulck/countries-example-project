import axios from "axios";

const instance = axios.create({ baseURL: 'https://restcountries.com/v2' });

export default instance;

export const getCountries = () => instance.get('all');

export const getCountry = (countryCode) => instance.get(`alpha/${countryCode}`);
export const getCountryList = (countryCodes) => instance.get(`alpha?codes=${countryCodes.join(',')}`);