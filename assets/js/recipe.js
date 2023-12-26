import { RECIPE_API_KEY } from "./config.js";
import { RECIPE_APP_ID } from "./config.js";

let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_API_KEY}`;

function fetchRecipes(queryString) {
  url += `&q=${queryString}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.hits);
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}

$(document).ready(function () {
  $("#searchRecipe").click(function (event) {
    event.preventDefault();
    var recipeInput = $("#recipe").val().trim();
    if (recipeInput) {
      var allergiesSelected = $("#allergiesSelect").val() || [];
      allergiesSelected = addFilterToUrl("health", allergiesSelected);
      var dietsSelected = $("#dietsSelect").val() || [];
      dietsSelected = addFilterToUrl("diet", dietsSelected);
      var caloriesSelected = parseInt($("#caloriesRange").val());
      caloriesSelected = addFilterToUrl("calories", [
        caloriesSelected.toString(),
      ]);
      fetchRecipes(recipeInput);
    } else {
      $("#exampleModal").modal("show");
    }
  });
});

function addFilterToUrl(key, array) {
  for (let i = 0; i < array.length; i++) {
    url += `&${key}=${array[i]}`;
  }
}
