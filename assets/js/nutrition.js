import { NUTRITION_API_KEY } from "./config.js";
import { NUTRITION_API_ID } from "./config.js";

let nutriEndPoint = "https://api.edamam.com/api/nutrition-details";
let recipeIngredients = [];

function getData(ingreArray) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    ingr: ingreArray,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var queryURL =
    "" +
    nutriEndPoint +
    "?app_id=" +
    NUTRITION_API_ID +
    "&app_key=" +
    NUTRITION_API_KEY;

  fetch(queryURL, requestOptions)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      appendNutritionElements(data);
    });
}

function appendNutritionElements(recipeData) {
  $("#nutritionDiv").empty();

  let nutritionChild = `<div class="container mt-4">

                        <div class="row">
                            <div class="col-md-12">
                                <h2>General Information</h2>
                                <ul class="list-group">
                                    <li class="list-group-item"><strong>Calories:</strong> <span id="calories"></span>
                                        kcal</li>
                                    <li class="list-group-item"><strong>Total Weight:</strong> <span
                                            id="totalWeight"></span> g</li>
                                    <li class="list-group-item"><strong>Diet Labels:</strong> <span
                                            id="dietLabels"></span></li>
                                    <li class="list-group-item"><strong>Health Labels:</strong> <span
                                            id="healthLabels"></span></li>
                                </ul>
                            </div>

                            
                        </div>

                        <div class="mt-4">
                            <h2>Ingredients</h2>
                            <ul class="list-group" id="ingredientsList"></ul>
                        </div>

                        <div class="mt-4">
                            <h2>Additional Information</h2>
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Cuisine Type:</strong> <span
                                        id="cuisineType"></span></li>
                                <li class="list-group-item"><strong>Meal Type:</strong> <span id="mealType"></span></li>
                                <li class="list-group-item"><strong>Dish Type:</strong> <span id="dishType"></span></li>
                            </ul>
                        </div>
                        <div class="container mt-5">
                        <div class="row mt-5">
                            <div class="col-md-12">
                                <h2>Percentage of Nutrients by Daily intake</h2>
                                <canvas id="totalNutrientsChart"></canvas>
                            </div>
                        </div>
                    </div>
                    </div>`;
  $("#nutritionDiv").append(nutritionChild);
  displayData(recipeData);
}

function displayData(jsonData) {
  $("#calories").text(jsonData.calories);
  $("#totalWeight").text(jsonData.totalWeight);
  $("#dietLabels").text(jsonData.dietLabels.join(", "));
  $("#healthLabels").text(jsonData.healthLabels.join(", "));
  var ingredientsList = $("#ingredientsList");
  ingredientsList.empty();
  jsonData.ingredients.forEach(function (ingredient) {
    ingredientsList.append(
      "<li class='list-group-item'>" + ingredient.text + "</li>"
    );
  });
  $("#cuisineType").text(jsonData.cuisineType.join(", "));
  $("#mealType").text(jsonData.mealType.join(", "));
  $("#dishType").text(jsonData.dishType.join(", "));

  const labels = Object.values(jsonData.totalDaily).map((x) => x.label);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Nutrients",
        data: Object.values(jsonData.totalDaily).map((x) => x.quantity),
      },
    ],
  };
  var totChart = new Chart(document.getElementById("totalNutrientsChart"), {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      legend: true,
    },
  });
}

function getIngredients() {
  $("#nutritionDiv").empty();
  // Get the content of the textarea
  var str = document.getElementById("ingredientTextArea").value;

  if (!str) {
    alert("Please enter some ingredients!");
    return;
  }

  if (!str.includes(",")) {
    alert("Please add commas between each ingredient!");
    return;
  }

  // Split the content into an array using commas as the delimiter
  recipeIngredients = str.split(",");

  // Trim each string to remove whitespaces
  recipeIngredients = recipeIngredients.map(function (str) {
    return str.trim();
  });

  getData(recipeIngredients);
}

$("#submitBtn").click(function (event) {
  event.preventDefault();
  getIngredients();
});
