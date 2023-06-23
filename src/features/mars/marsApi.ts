import { useFetch } from "usehooks-ts";
import fetch from "../../utils/fetch";

const baseUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/?api_key=${
  import.meta.env.VITE_API
}`;

export const fetchRoverInfo = () => {
  return fetch(baseUrl);
};
