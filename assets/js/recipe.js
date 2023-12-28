import { RECIPE_API_KEY } from "./config.js";
import { RECIPE_APP_ID } from "./config.js";

let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_API_KEY}`;

function fetchRecipes(queryString) {
  url += `&q=${queryString}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.hits);
      createRecipeCards(data.hits)
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
      // add function here to display the cards to html
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

function createRecipeCards(inputData) {
  const mainDiv = $("<div>")
    .addClass("row justify-content-center")
    .attr("id", "cardRow");
  inputData.forEach((element) => {
    let cardDiv = buildCard(element);
    mainDiv.append(cardDiv);
  });
  $("#mainContent").prepend(mainDiv); // check the correct id
}
// Builds a single Recipe Card based on the element passed in
// Takes an object with properties of title, sourceName, thumbnail, and link fields


function buildCard(element) {
  const cardBody = $("<div>").addClass("card-body");
  const titleA = $("<a>")
    .text(element.title)
    .attr("href", element.sourceUrl)
    .addClass("stretched-link text-dark");
  const thumbnailImg = $(`<img>`)
    .attr("src", element.thumbnail)
    .attr("alt", `${element.title} Thumbnail`);
  const sourceP = $("<p>").html(`Source:&nbsp;<span class="font-weight-bold">${element.
    sourceName}</span>`);
  cardBody.append(titleA, thumbnailImg, sourceP);
  const card = $("<div>")
    .addClass("card shadow-sm h-100 py-2")
    .append(
      $("<div>").addClass("card-header").text("Ingredients"),
      cardBody
    );
  return $("<div>").addClass("col-md-6 col-lg-4 mb-5").append(card);
}


function createRecipeView(
  recipeLabel,
  foodCategory,
  ingredientLines,
  calories,
  cuisineType,
  mealType,
  dishType,
  fat,
  carbs,
  protein,
  imageSrc
) {
  const card = `
    <section class="container">
      <div class="card border-secondary mb-3" style="max-width: 800px;">
        <div class="row g-0">
          <div class="container" style="max-width: 800px;">
            <div class="row">
              <!-- Image Column -->
              <div class="col-md-4 border">
                <img src="${imageSrc}" alt="Image" class="img-fluid">
              </div>

              <!-- Right Columns with Two Rows -->
              <div class="col-md-8 border">
                <!-- First Row -->
                <div class="row">
                  <div class="col-md-8 border">${recipeLabel}</div>
                  <div class="col-md-4 border">${foodCategory}</div>
                </div>

                <!-- Second Row -->
                <div class="row">
                  <div class="col-md-12 border">Ingredients</div>
                </div>

                <!-- Third Row -->
                <div class="row">
                  <div class="col-md-4 border" id="ingredientLines">
                    <ul style="list-style-type: none; padding: 0; margin: 0;">
                      ${generateIngredientList(ingredientLines)}
                    </ul>
                  </div>
                  <div class="col-md-4 border">
                    <ul style="list-style-type: none; padding: 0; margin: 0;">
                      <li id="calories">${calories}</li>
                      <li id="cusineType">${cuisineType}</li>
                      <li id="mealType">${mealType}</li>
                      <li id="dishType">${dishType}</li>
                    </ul>
                  </div>
                  <div class="col-md-4 border">
                    <ul style="list-style-type: none; padding: 0; margin: 0;">
                      <li id="digest">Fat: ${fat}</li>
                      <li id="digest">Carbs: ${carbs}</li>
                      <li id="digest">Protein: ${protein}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return card;
}

// Helper function to generate the ingredient list items
function generateIngredientList(ingredientLines) {
  const ingredients = ingredientLines.split('\n').map(line => `<li>${line.trim()}</li>`).join('');
  return ingredients;
}
