import { RECIPE_API_KEY } from "./config.js";
import { RECIPE_APP_ID } from "./config.js";

function fetchRecipes(queryString, queryFilters) {
  let url = `https://api.edamam.com/search?q=${queryString}&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_API_KEY}`;
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

// fetchRecipes("pasta", {
//   diet: "high-protein",
//   calories: "800",
//   health: "peanut-free",
//   health: "gluten-free",
// });

$(document).ready(function () {
  $("#allergiesSelect").change(function () {
    var selectedAllergies = $(this).val();
    console.log(selectedAllergies);
  });
});

$(document).ready(function () {
  $("#dietsSelect").change(function () {
    var selectedDiets = $(this).val();
    console.log(selectedDiets);
  });
});

$(document).ready(function () {
  $("#caloriesRange").change(function () {
    var selectedCalorie = $(this).val();
    console.log(selectedCalorie);
  });
});

$(document).ready(function () {
  $("#searchRecipe").click(function (event) {
    event.preventDefault();
    var recipeInput = $("#recipe").val().trim();
    if (recipeInput) {
      fetchRecipes(recipeInput);
    } else {
      $("#exampleModal").modal("show");
    }
  });
});
