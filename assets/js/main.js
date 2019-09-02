// Loading variable to hide loadingDiv as standard.
let $loading = $('.loadingDiv').hide();
// StartPage variable to show as standard.
let $startPage = $('.start-page').show();
// Turn information is hidden before the game starts.
let $turnCounter = $('.turn-counter').hide();
// Victory page hidden as standard.
let $victory = $('.victoryPage').hide();

// Settings for game level. Each integer represents number of cards * 2.
let easy = 4;
let medium = 5;
let hard = 6;

// Arrays for PokemonImgUrl.
let originalPokemonImgUrl = [];
let duplicateAllPokemonImgUrl = [];
let allPokemonImgUrl = [];

// Arrays for the matching the cards.
let gameCards = [];
let checkMatch = [];

// Arrays for clicked events.
let clickedEvent = [];
let clickedEvent2 = [];

// Clicks variable.
let countedFlips = 0;

// PokéAPI URL.
const pokemonDataUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Mute Audio.

let muteAudio = false;

function muteAll() {
    $(document).on('click', '.mute-all', function() {
        muteAudio = true;
    })
}

function soundOn() {
    $(document).on('click', '.sound-on', function() {
        muteAudio = false;
    })
}

// Sound functions.

function soundClicked() {

    if(muteAudio == true) {
        $('#clickedSound')[0].muted = true;
        $('#clickedMatch')[0].muted = true;
        $('#clickedVictory')[0].muted = true;
    } 
    
        $('#clickedSound')[0].currentTime = 0;
        $('#clickedSound')[0].play();


}

function soundMatch() {

    if(muteAudio === true) {
        $('#clickedSound')[0].muted = true;
        $('#clickedMatch')[0].muted = true;
        $('#clickedVictory')[0].muted = true;
    }


    $('#clickedMatch')[0].currentTime = 0;
    $('#clickedMatch')[0].play();
}

function soundVictory() {

    if(muteAudio === true) {
        $('#clickedSound')[0].muted = true;
        $('#clickedMatch')[0].muted = true;
        $('#clickedVictory')[0].muted = true;
    }

    $('#clickedVictory')[0].currentTime = 0;
    $('#clickedVictory')[0].play();
}



// This function creates a random number depending on the settings below. 
function randomNumber() {
    
    // Settings for max randomnumbers starting from index 1.
    let randomNumberMax = 600;
    let fromIndex =  1;

    // Math random function with values from randomnumbers.
    return Math.floor(Math.random() * randomNumberMax) + fromIndex;
}

// when all cards matches the user wins and the victory page loads.
function victory() {
    if (gameCards.length === allPokemonImgUrl.length) {

        // Reset turn counter
        $('.counted-turns').text('You Won!');
        
        //setTimeouts to let the user see the last card before it calls the victory. 
        setTimeout(function () {
            $victory.show(800);
            soundVictory(); // Calls the victory sound.
        }, 1000)
        setTimeout( function() {
            $('.card').hide(800);
        }, 1000)
        
    }
}



// function for play the game, checks if cards matches or not. Calls the victory function when all the cards are matched. 
function playGame() {
    // click function.
    $(document).on('click', '.card' , function(event) {
        let $this = $(event.currentTarget)
        $this.addClass('visible')

        // this pushes click events to arrays to keep track of this and previous this. 
        clickedEvent.push($this);
        clickedEvent2.push($this);

        // Calling the sound when a card is clicked.

        soundClicked();

        /* Matching the cards */

        // Pushes the image src into an array to check if there is a match.
        let matchedCards  = $this.find('img').attr('src')
        checkMatch.push(matchedCards);

        // if statement to see if the src string matches. 
        if(checkMatch[0] === checkMatch[1]) {

            // Calls the sound when a match is made.
            soundMatch();

            // if true then push into a global array that store all the matched cards (image src).
            gameCards.push(checkMatch[0]);
            gameCards.push(checkMatch[1]);
            
            countedFlips++ // Add a number to the flip counter.
    
            checkMatch.length = 0; // reset the checkMatch array.
            
            // if two card matches then add class matched that removes pointing. 
            // Keeps track of the actual card from this and previous this array (clicked, clicked2)

            $this.addClass('matched')
            clickedEvent[0].addClass('matched');

            // removes the data from the arrays that keep tracks of this and previous this. 
            clickedEvent.length = 0;
            clickedEvent2.length = 0;
        
        } 

        
        /* Card not matched */

        // Disable clicks on a single card with pokemoncard-front.
        // Prevents the user for clicking fast on a new card when the other two flips back. 
        if(checkMatch.length == 1) {
            $this.addClass('can-not-flip');
        }

        // if the array length is equal to 2 and the strings do not match then reset the array and flip cards to the pokemoncard-back. 
        if(checkMatch.length == 2 && checkMatch[0] != checkMatch[1]) {

            countedFlips++ // Add a number to the flip counter.

            checkMatch.length = 0; // resets the matching array. 

            

            // Prevents the user to click on other cards while the cards flip back
            $('.card').addClass('can-not-flip') 
            
            // flips the cards with a setTimeout. Removes this and previous this data from the arrays  .
            setTimeout( function(){
                $('.card').removeClass('can-not-flip') // Enables the user to flip cards again.
                $this.removeClass('visible');
                clickedEvent2[0].removeClass('visible');
                clickedEvent2.length = 0; // Clear data.
                clickedEvent.length = 0; // Clear data.
                }, 1000 ); // timer to let the user remember the cards. 

                
   
        }

        // Count Flips //

        $('.counted-turns').text('Flips: ' + countedFlips);

        
        /* The user wins */

        // Run the victory function when all cards are matched. It compares length of gameCards and allPokemonImgUrl.
        
        victory(); 
        
    })
    
}

// Start the game.
playGame();
// Enable Mute button.
muteAll();
// Enable sound On.
soundOn();

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
    gameCards.length = 0;
    clickedEvent.length = 0;
    clickedEvent2.length = 0;
    countedFlips = 0;
    $('#output').empty();
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

            <div class="col-4 col-sm-3 card-container">
            <div class="card mx-auto">
            <div class="pokemoncard-back transformation"></div>
            <div class="pokemoncard-front transformation"><img class="pokemon" src="${[pokemonUrl]}"></div>
            </div>
            </div>

        `);
        
    }
)}

/* This function copies the array so that we always have two of the same cards. 
Then concat into a new array and shuffles it. After that it outputs the result */
function startGame(){
    
    setTimeout( function(){
        $victory.hide(500); // Hides the victory. 
        $turnCounter.hide(500); // Hides the turns count.
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
        $turnCounter.show(); // Shows the turns count.
        $('.counted-turns').text('Flips: 0') // Shows the standard counted turns.
        }, 4500 );
    }


/* Events for clicking on game levels. It iterates to check how many cards it needs
and calls functions accordingly. */

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















 