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
        url: pokemonDataUrl + randomNumber(), // Calling randomnnumber to get a random pokémon.
        success: function(pokemonData) {
                
                var pokemonImgUrl = pokemonData.sprites.front_default; // Store and extract pokemon images.
                originalPokemonImgUrl.push(pokemonImgUrl); // store ImagesURL to a global array called allPokemonImgUrl.

        }
        
    })
}

// Shuffle code from css-tricks.com.
function Shuffle(cards) {
	for(var j, x, i = cards.length; i; j = parseInt(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
	return cards;
}; 

// function iterates through allPokemonImgUrl array and outputs it into the DOM. 
function output() {
    allPokemonImgUrl.forEach(function (i) {
        $('#output').append('<img src="'+ [i] +'">');
    }
        
)}

/* This function copies the array so that we always have two of the same cards. 
Then concat into a new array and shuffles it. After that it outputs the result.*/
function startGame(){

    setTimeout( function(){
        duplicateAllPokemonImgUrl = originalPokemonImgUrl.slice();
        }, 1000 );
    
    setTimeout( function(){
        allPokemonImgUrl = originalPokemonImgUrl.concat(duplicateAllPokemonImgUrl);
        }, 1500 );
    
    setTimeout( function(){
        Shuffle(allPokemonImgUrl)
        }, 2000 );

    setTimeout( function(){
        output();
        }, 2500 );
    }

/* Events for clicking on game levels. It iterates to check how many cards it needs
and calls the function getData accordingly. */

$(document).on('click', '#easy', function() {
    for (var cards = 0; cards < easy; cards++) { 
        getData();
    }

    startGame();
   
})

$(document).on('click', '#medium', function() {
    for (var cards = 0; cards < medium; cards++) {
        getData();
    } 

    startGame();

})

$(document).on('click', '#hard', function() {
    for (var cards = 0; cards < hard; cards++) {
        getData();
    } 

    startGame();

})


