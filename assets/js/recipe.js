import { API_KEY } from "./config.js";
import { APP_ID } from "./config.js";

function fetchRecipes(queryString, queryFilters) {
  let url = `https://api.edamam.com/search?q=${queryString}&app_id=${APP_ID}&app_key=${API_KEY}`;
  if (queryFilters && Object.keys(queryFilters).length > 0) {
    const filterParams = Object.entries(queryFilters)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    url += "&filters=" + filterParams;
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.hits);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}

fetchRecipes("pasta", {
  diet: "high-protein",
  calories: "800",
  health: "peanut-free",
  health: "gluten-free",
});
