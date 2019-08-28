// Settings for game level. Each integer represents number of cards * 2.
let easy = 4;
let medium = 6;
let hard = 8;


// Function randomNumbers.
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
        url: 'https://pokeapi.co/api/v2/pokemon/' + randomNumber(), // Calling randomnnumber to get random pokémon.
        success: function(pokemonData) {
            console.log(pokemonData);
        }

    })
}

/* Events for clicking on game levels. It iterates to check how many cards it needs
and calls the function getData accordingly. */

$(document).on('click', '#easy', function() {
    for (var i = 0; i < easy; i++) { 
        getData();
    } 
})

$(document).on('click', '#medium', function() {
    for (var i = 0; i < medium; i++) {
        getData();
    } 
})

$(document).on('click', '#hard', function() {
    for (var i = 0; i < hard; i++) {
        getData();
    } 
})


