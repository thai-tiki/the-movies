import { stringify } from "qs";

const API_KEY = "2334810ccf8f48afd51dacfae975dacd";
const BASE_URL = "https://api.themoviedb.org/3";

export const request = async ({
  method = "GET",
  headers = {},
  params = {},
  body = null,
  path = "",
}) => {
  try {
    const query = { api_key: API_KEY, ...params };
    const queryStr = `?${stringify(query)}`;
    const res = await fetch(`${BASE_URL}/${path}${queryStr}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    let success = true;
    if (res.status !== 200) success = false;
    const responseData = await res.json();
    return {
      ...responseData,
      success,
    };
  } catch (e) {
    // TODO: Handle error -> show toast
    return null;
  }
};

export const getMoviesByCategory = (categoryName: string, page: number) =>
  request({
    path: `movie/${categoryName}`,
    params: {
      page,
    },
  });

export const getMovieById = (id: string) =>
  request({
    path: `movie/${id}`,
  });

export const searchMoviesByName = (query: string, page: number = 1) =>
  request({
    path: `/search/movie`,
    params: {
      query,
      page,
    },
  });
