import axios from "axios";

export default axios.create({
    baseURL: 'https://rc-api-test.ex7.pl/api/',
    timeout: 1000,
  });