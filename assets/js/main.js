// Loading variable to hide loadingDiv as standard.
let $loading = $('.loadingDiv').hide();

// Settings for game level. Each integer represents number of cards * 2.
let easy = 4;
let medium = 5;
let hard = 6;

// Arrays for PokemonImgUrl.
let originalPokemonImgUrl = [];
let duplicateAllPokemonImgUrl = [];
let allPokemonImgUrl = [];

// PokéAPI URL.
const pokemonDataUrl = 'https://pokeapi.co/api/v2/pokemon/';

// This function creates a random number depending on the settings below. 
function randomNumber() {
    
    // Settings for max randomnumbers starting from index 1.
    let randomNumberMax = 600;
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

// function iterates through allPokemonImgUrl array.
function output() {
    allPokemonImgUrl.forEach(function (pokemonUrl) {
        $('#output').append
        
        (`

        
            <div class="pokemoncard col-4 col-sm-3">
            <div class="pokemon"><img src="${[pokemonUrl]}"></div>
            </div>
  
   
        
        
        `);
        
    }
)}

// Clears all the current data in the arrays before appending new data.
function clear() {
    originalPokemonImgUrl.length = 0;
    duplicateAllPokemonImgUrl.length = 0;
    allPokemonImgUrl.length = 0;
    $('#output').empty();
}


/* Code from stackoverflow.com
This disables the buttons after the on click event on the game level buttons.
This is to prevent extra data to be requested while it's loading */
$.fn.timedDisable = function(time) {
    if (time == null) { time = 4500; }
    return $(this).each(function() {
        $(this).attr('disabled', 'disabled');
        var disabledElem = $(this);
        setTimeout(function() {
            disabledElem.removeAttr('disabled');
        }, time);
    });
};

// Function to target the buttons and disable them while game starts. 
function disableButtons() {
    $('#easy').timedDisable();
    $('#medium').timedDisable();
    $('#hard').timedDisable();
}

/* This function copies the array so that we always have two of the same cards. 
Then concat into a new array and shuffles it. After that it outputs the result and hide the pokemons */
function startGame(){
    
    setTimeout( function(){
        $loading.show(); // Show loading pikachu.
        }, 100 ); 
    
    setTimeout( function(){
        duplicateAllPokemonImgUrl = originalPokemonImgUrl.slice();
        }, 1500 );
    
    setTimeout( function(){
        allPokemonImgUrl = originalPokemonImgUrl.concat(duplicateAllPokemonImgUrl);
        }, 3000 );
    
    setTimeout( function(){
        Shuffle(allPokemonImgUrl)
        }, 4000 );

    setTimeout( function(){
        output();
        }, 4500 );

    setTimeout( function(){
        hidePokemon();
        $loading.hide(); // Hide loading pikachu.
        }, 4500 );
    }

// Hides the pokemon when the game starts.   
function hidePokemon() {
     $('.pokemon').hide();
}



    
/* Events for clicking on game levels. It iterates to check how many cards it needs
and calls the function getData accordingly. */

$(document).on('click', '#easy', function() {
    for (var cards = 0; cards < easy; cards++) { 
        getData();
    }
    disableButtons();   
    clear();
    startGame();
})
   
$(document).on('click', '#medium', function() {
    for (var cards = 0; cards < medium; cards++) {
        getData();
    }
    disableButtons();   
    clear();
    startGame();
})

$(document).on('click', '#hard', function() {
    for (var cards = 0; cards < hard; cards++) {
        getData();
    } 
    disableButtons();   
    clear();
    startGame();
})











