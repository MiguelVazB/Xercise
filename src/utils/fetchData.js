const createApiOptions = (host) => ({
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": host,
  },
});

export const exerciseOptions = createApiOptions("exercisedb.p.rapidapi.com");
export const videoOptions = createApiOptions("youtube-v2.p.rapidapi.com");

export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
