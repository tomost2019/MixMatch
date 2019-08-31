// Loading variable to hide loadingDiv as standard.
let $loading = $('.loadingDiv').hide();
// StartPage variable to show as standard.
let $startPage = $('.start-page').show();
// Turn information is hidden before the game starts.
let $countClicks = $('.count-clicks').hide();


// Settings for game level. Each integer represents number of cards * 2.
let easy = 4;
let medium = 5;
let hard = 6;

// Arrays for PokemonImgUrl.
let originalPokemonImgUrl = [];
let duplicateAllPokemonImgUrl = [];
let allPokemonImgUrl = [];

// Arrays for the started game.
let matchOrNot = [];

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
                
            var pokemonImgUrl = pokemonData.sprites.front_shiny; // Store and extract pokemon images.
            originalPokemonImgUrl.push(pokemonImgUrl); // store ImagesURL to a global array called allPokemonImgUrl.

        }
        
    })
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

// Clears all the current data in the arrays before appending new data.
function clear() {
    originalPokemonImgUrl.length = 0;
    duplicateAllPokemonImgUrl.length = 0;
    allPokemonImgUrl.length = 0;
    $('#output').empty();
}

/* This function copies the array so that we always have two of the same cards. 
Then concat into a new array and shuffles it. After that it outputs the result */
function startGame(){
    
    setTimeout( function(){
        $countClicks.hide(500); // Hides the turns count.
        $startPage.hide(500); // Hides the startPage when game starts. 
        $loading.show(1000); // Show loading pikachu.
        }, 100 ); 
    
    setTimeout( function(){
        duplicateAllPokemonImgUrl = originalPokemonImgUrl.slice();
        }, 1500 );
    
    setTimeout( function(){
        allPokemonImgUrl = originalPokemonImgUrl.concat(duplicateAllPokemonImgUrl);
        }, 3000 );
    
    setTimeout( function(){
        Shuffle(allPokemonImgUrl)
        $loading.hide(700); // Hide loading pikachu.
        }, 4000 );

    setTimeout( function(){
        output();
        $countClicks.show(); // Shows the turns count.
        }, 4500 );
    }

// Shuffle code from css-tricks.com.
function Shuffle(cards) {
	for(var j, x, i = cards.length; i; j = parseInt(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
	return cards;
}; 

// function iterates through allPokemonImgUrl array and appends the output.
function output() {
    allPokemonImgUrl.forEach(function (pokemonUrl) {
        $('#output').append
        
        (`

            <div class="col-4 col-sm-3 card-container pb-2">
            <div class="card mx-auto">
            <div class="pokemoncard-back transformation"></div>
            <div class="pokemoncard-front transformation"><img class="pt-3 card-value" src="${[pokemonUrl]}"></div>
            </div>
            </div>

        `);
        
    }
)}

// When clicking each card it adds the class visible so that the front card is visible. 

/*
function clickCard() {
    $(document).ready(function() {
        $('.card').on('click', e => {
            let $this = $(e.currentTarget)
            $this.addClass('visible')
            let cardValue = $this.attr('src');
            matchOrNot.push(cardValue);
    }
)}

)}
*/


function clickCard() {
    $(document).ready(function() {

        $(document).on('click', '.card' , e => {
            let $this = $(e.currentTarget)
            $this.addClass('visible')
            let cardValue = $this.attr('src');
            matchOrNot.push(cardValue);
    
            console.log(matchOrNot)

    })

    })
}



/*
function clickCard() {
    $(document).on('click', '.card', function() {
        $(this).addClass('visible');

        var cardValue = $(this).attr('src');
        matchOrNot.push(cardValue);

    })
}*/
   
/* Events for clicking on game levels. It iterates to check how many cards it needs
and calls the function getData accordingly. */

$(document).on('click', '#easy', function() {
    for (var cards = 0; cards < easy; cards++) { 
        getData();
    }
    disableButtons();   
    clear();
    startGame();
    clickCard();
 
})
   
$(document).on('click', '#medium', function() {
    for (var cards = 0; cards < medium; cards++) {
        getData();
    }
    disableButtons();   
    clear();
    startGame();
    clickCard();
})

$(document).on('click', '#hard', function() {
    for (var cards = 0; cards < hard; cards++) {
        getData();
    } 
    disableButtons();   
    clear();
    startGame();
    clickCard();
})















 