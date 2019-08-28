// Settings for game level. Each integer represents number of cards * 2.
let easy = 4;
let medium = 6;
let hard = 8;

// Arrays for PokemonImgUrl.

let originalPokemonImgUrl = [];
let duplicateAllPokemonImgUrl = [];
let allPokemonImgUrl = [];


// PokéAPI URL.
const pokemonDataUrl = 'https://pokeapi.co/api/v2/pokemon/';

// This function creates a random number depending on the settings below. 
function randomNumber() {
    
    // Settings for max randomnumbers starting from index 1.
    let randomNumberMax = 500;
    let fromIndex =  1;

    // Math random function with values from randomnumbers.
    return Math.floor(Math.random() * randomNumberMax) + fromIndex;
}

// Function for getting data from PokéAPI.
function getData() {
    $.ajax ({ 
        type: 'GET',
        url: pokemonDataUrl + randomNumber(), // Calling randomnnumber to get random pokémon.
        success: function(pokemonData) {

                var pokemonImgUrl = pokemonData.sprites.front_default; // Store and extract pokemon images.

                originalPokemonImgUrl.push(pokemonImgUrl); // store ImagesURL to a global array called allPokemonImgUrl.
        }
        
    })
}

// This function copies the array and concat into a new array so that we always get two pictures each from the API. It executes from a setTimeout.
function duplicate(){

    setTimeout( function(){
        duplicateAllPokemonImgUrl = originalPokemonImgUrl.slice();
        }, 1000 );
    
    setTimeout( function(){
        allPokemonImgUrl = originalPokemonImgUrl.concat(duplicateAllPokemonImgUrl);
        console.log(allPokemonImgUrl);
        }, 1500 );
    }
   


/* Events for clicking on game levels. It iterates to check how many cards it needs
and calls the function getData accordingly. */

$(document).on('click', '#easy', function() {
    for (var cards = 0; cards < easy; cards++) { 
        getData();
    }

    duplicate();
})

$(document).on('click', '#medium', function() {
    for (var cards = 0; cards < medium; cards++) {
        getData();
    } 

    duplicate();

})

$(document).on('click', '#hard', function() {
    for (var cards = 0; cards < hard; cards++) {
        getData();
    } 

    duplicate();

})


