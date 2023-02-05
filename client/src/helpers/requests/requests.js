import axios from "axios";

// ** PROD
const prefix = "https://ivexlibrary.sk/api";
export const prefix_url = "https://ivexlibrary.sk/img";
const prefix_scraper = "https://scraper.ivexlibrary.sk";
// ** DEV
// export const prefix_url = 'http://localhost:8000';
// const prefix = 'http://localhost:8000/api';

export const default_request_config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const multipart_request_config = {
  headers: {
    Accept: "multipart/form-data",
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  },
};

export const post_request = async (url, data, config) =>
  await axios.post(prefix + url, data, config);

export const put_request = async (url, data, config) =>
  await axios.put(prefix + url, data, config);

export const get_request = async (url, config) =>
  await axios.get(prefix + url, config);

export const delete_request = async (url, config) =>
  await axios.delete(prefix + url, config);

export const get_request_blob = async (url, config) =>
  await axios.get(prefix + url, { ...config, responseType: "blob" });

export const get_request_scraper = async (url, config) =>
  await axios.get(prefix_scraper + url, config);

export const delete_request_scraper = async (url, config) =>
  await axios.delete(prefix_scraper + url, config);
