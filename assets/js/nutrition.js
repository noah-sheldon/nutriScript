var nutriEndPoint = "https://api.edamam.com/api/nutrition-data";
var appKey = "17bd128ddf8ca68645f972ccdade2f3a";
var appId = "b30b69ec"
var caloriesTotal=1000;
var calciumTotal=0;

/* 
: 
CA
: 
{label: 'Calcium, Ca', quantity: 57, unit: 'mg'}
 */


var recipeIngredients=[];

function getData(callSearchWord) {

    var queryURL = ""+nutriEndPoint+"?app_id="+appId+"&app_key="+appKey+"&nutrition-type=cooking&ingr="+callSearchWord+"";

    fetch(queryURL)
        .then(function (data) {
          return data.json();
        }).then(function(data) {
            // console.log(data)
            caloriesTotal+=data.calories
            console.log(caloriesTotal)
           
          
        $("#calcium").text("Calories: "+caloriesTotal)

            calciumTotal+=data.totalNutrients.CA.quantity
            console.log(calciumTotal)
    });


}

function getArray() {
    // Get the content of the textarea
    var textareaContent = document.getElementById('demo').value;

    // Split the content into an array using commas as the delimiter
    recipeIngredients = textareaContent.split(',');

    // Trim each string to remove leading and trailing whitespaces
    recipeIngredients = recipeIngredients.map(function (str) {
      return str.trim();
    });

    // Log the resulting array to the console (you can do whatever you want with it)
    console.log(recipeIngredients);
  }

$("#submitBtn").on("click", function() {
    
      getArray();
      //console.log(recipeIngredients)

    for(i=0;i<recipeIngredients.length;i++){

        getData(recipeIngredients[i]);
      

    }

});

$("#clearBtn").on("click", function() {
    
  $("#demo").text("");

});
/* 
<textarea name="" id="demo" cols="30" rows="10" class="form-control">1 cup rice, 100 grams chickpeas</textarea>

<button type="button" id="submitBtn" class="btn btn-green px-5 calc-analysis-api"> Submit</button>
<button type="button" id="clearBtn" class="btn btn-green px-5 calc-analysis-api"> Clear</button>

<ul id="nutriList"> 
    <li id="calcium"></li>
</ul>
 */


