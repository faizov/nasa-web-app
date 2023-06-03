import fetch from "../../utils/fetch";

const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${
  import.meta.env.VITE_API
}`;

export const fetchApod = (dateParam: string | null) => {
  const query = dateParam ? `&date=${dateParam}` : "";
  return fetch(baseUrl + query);
};

export const fetchApodDate = (formattedDate: string) => {
  return fetch(baseUrl + `&date=${formattedDate}`);
};

export const fetchApodRandom = () => {
  return fetch(baseUrl + "&count=1").then((res) => {
    return res[0];
  });
};
