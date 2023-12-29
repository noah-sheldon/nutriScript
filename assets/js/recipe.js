import { RECIPE_API_KEY } from "./config.js";
import { RECIPE_APP_ID } from "./config.js";

let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_API_KEY}`;

function fetchRecipes(queryString) {
  url += `&q=${queryString}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      createRecipeCards(data.hits);
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

function createRecipeCards(inputData) {
  const mainDiv = $("<div>")
    .addClass("row justify-content-center")
    .attr("id", "cardRow");
  inputData.forEach((element) => {
    let cardDiv = buildCard(element);
    mainDiv.append(cardDiv);
  });
  $("#recipesDiv").prepend(mainDiv);
}

function buildCard(element) {
  const cardBody = $("<div>").addClass("card-body");
  const thumbnailImg = $(`<img>`)
    .attr("src", element.recipe.image)
    .attr("alt", `${element.recipe.label} Thumbnail`)
    .addClass("card-img-top");
  const calories = $("<p>").html(
    `Calories:&nbsp;<span class="font-weight-bold">${parseInt(
      element.recipe.calories
    )}</span>`
  );
  const cusineType = $("<p>").html(
    `Cusine Type:&nbsp;<span>${element.recipe.cuisineType}</span>`
  );
  const mealTyoe = $("<p>").html(
    `Meal Type:&nbsp;<span>${element.recipe.mealType}</span>`
  );
  const dishType = $("<p>").html(
    `Dish Type:&nbsp;<span>${element.recipe.dishType}</span>`
  );
  const btnDiv = $("<div>").addClass("btn-group float-right mt-2 d-flex");
  const viewBtn = $("<button>")
    .text("Full Recipe")
    .addClass("btn btn-success")
    .on("click", () => window.open(element.recipe.url, "_blank"));
  const nutritionBtn = $("<button>")
    .text("Analyse Nutrition")
    .addClass("btn btn-secondary ms-2")
    .on("click", () => window.open(element.recipe.shareAs, "_blank"));
  btnDiv.append(viewBtn, nutritionBtn);
  cardBody.append(
    thumbnailImg,
    calories,
    cusineType,
    mealTyoe,
    dishType,
    btnDiv
  );
  const card = $("<div>")
    .addClass("card shadow-sm h-100")
    .append(
      $("<div>").addClass("card-header fw-bold").text(element.recipe.label),
      cardBody
    );
  return $("<div>")
    .addClass("col-md-6 col-lg-4 mb-5")
    .attr("data-label", element.recipe.label)
    .append(card);
}

// function createRecipeView(
//   recipeLabel,
//   foodCategory,
//   ingredientLines,
//   calories,
//   cuisineType,
//   mealType,
//   dishType,
//   fat,
//   carbs,
//   protein,
//   imageSrc
// ) {
//   const card = `
//     <section class="container">
//       <div class="card border-secondary mb-3" style="max-width: 800px;">
//         <div class="row g-0">
//           <div class="container" style="max-width: 800px;">
//             <div class="row">
//               <!-- Image Column -->
//               <div class="col-md-4 border">
//                 <img src="${imageSrc}" alt="Image" class="img-fluid">
//               </div>

//               <!-- Right Columns with Two Rows -->
//               <div class="col-md-8 border">
//                 <!-- First Row -->
//                 <div class="row">
//                   <div class="col-md-8 border">${recipeLabel}</div>
//                   <div class="col-md-4 border">${foodCategory}</div>
//                 </div>

//                 <!-- Second Row -->
//                 <div class="row">
//                   <div class="col-md-12 border">Ingredients</div>
//                 </div>

//                 <!-- Third Row -->
//                 <div class="row">
//                   <div class="col-md-4 border" id="ingredientLines">
//                     <ul style="list-style-type: none; padding: 0; margin: 0;">
//                       ${generateIngredientList(ingredientLines)}
//                     </ul>
//                   </div>
//                   <div class="col-md-4 border">
//                     <ul style="list-style-type: none; padding: 0; margin: 0;">
//                       <li id="calories">${calories}</li>
//                       <li id="cusineType">${cuisineType}</li>
//                       <li id="mealType">${mealType}</li>
//                       <li id="dishType">${dishType}</li>
//                     </ul>
//                   </div>
//                   <div class="col-md-4 border">
//                     <ul style="list-style-type: none; padding: 0; margin: 0;">
//                       <li id="digest">Fat: ${fat}</li>
//                       <li id="digest">Carbs: ${carbs}</li>
//                       <li id="digest">Protein: ${protein}</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   `;

//   return card;
// }

// // Helper function to generate the ingredient list items
// function generateIngredientList(ingredientLines) {
//   const ingredients = ingredientLines
//     .split("\n")
//     .map((line) => `<li>${line.trim()}</li>`)
//     .join("");
//   return ingredients;
// }
