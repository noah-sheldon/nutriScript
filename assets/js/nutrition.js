var nutriEndPoint = "https://api.edamam.com/api/nutrition-data";
var appKey = "17bd128ddf8ca68645f972ccdade2f3a";
var appId = "b30b69ec"



var recipeIngredients = [];


function getData(callSearchWord) {
    
    
    var queryURL = ""+nutriEndPoint+"?app_id="+appId+"&app_key="+appKey+"&nutrition-type=cooking&ingr="+callSearchWord+"";

    fetch(queryURL)
        .then(function (data) {
          return data.json();
        }).then(function(data) {
        
            console.log(data);
    });
   
    
}


$("#submitBtn").on("click", function() {

    function getArray() {
        // Get the content of the textarea
        var textareaContent = document.getElementById('demo').value;
    
        // Split the content into an array using commas as the delimiter
        var stringArray = textareaContent.split(',');
    
        // Trim each string to remove leading and trailing whitespaces
        stringArray = stringArray.map(function (str) {
          return str.trim();
        });
    
        // Log the resulting array to the console (you can do whatever you want with it)
        //console.log(stringArray);
      }

    recipeIngredients= getArray();

    for(i=0;i<recipeIngredients.length;i++){

        getData(recipeIngredients[i]);
    
    }
    
});



{/* <p>
        <textarea name="" id="demo" cols="30" rows="10" class="form-control">1 cup rice, 100 grams chickpeas</textarea>
    </p>
       <button type="button" id="submitBtn" class="btn btn-green px-5 calc-analysis-api"> Submit</button>
   */}

  

  

