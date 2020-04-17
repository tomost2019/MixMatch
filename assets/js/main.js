// StartPage variable to show as standard.
let $startPage = $('.start-page').show();
// Turn information is hidden before the game starts.
let $turnCounter = $('.turn-counter').hide();
// Victory page hidden as standard.
let $victory = $('.victoryPage').hide();

// Always show the game-sidebar on mobile devices. 
$(document).ready(() => {
    $('#game-sidebar').show()
})

// Enable Toggle button. 
$(document).ready(() => {
    $('#sidebarCollapse').on('click', () => {
        $('#game-sidebar').toggleClass('active');
        $('#output').hide();
        $turnCounter.hide()
        $('.start-page').show()
    });
});

// Settings for game level. Each integer represents number of cards * 2.
let easy = 4;
let medium = 5;
let hard = 6;
let extreme = 12;

// Array for PokemonImgUrl.
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
function muteAll() {
    $(document).on('click', '.mute-all', () => {
        $('#clickedSound')[0].muted = true;
        $('#clickedMatch')[0].muted = true;
        $('#clickedVictory')[0].muted = true;
    })
}

// Turn on Audio.
function soundOn() {
    $(document).on('click', '.sound-on', () => {
        $('#clickedSound')[0].muted = false;
        $('#clickedMatch')[0].muted = false;
        $('#clickedVictory')[0].muted = false;
    })
}

// Sound functions.
function soundClicked() {
    $('#clickedSound')[0].currentTime = 0;
    $('#clickedSound')[0].play();
}

function soundMatch() {
    $('#clickedMatch')[0].currentTime = 0;
    $('#clickedMatch')[0].play();
}

function soundVictory() {
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
        setTimeout(() => {
            $victory.show();
            soundVictory(); // Calls the victory sound.
        }, 1000)
        setTimeout(() => {
            $('.card').hide();
            $('#game-sidebar').toggleClass('active');
            $('#sidebarCollapse').hide();
            $('#output').hide();
        }, 1000)
        
    }
}

// Function for playGame, checks if cards matches or not. Counting flips. Calls the victory function when all the cards are matched. 
function playGame() {
    // click function.
    $(document).on('click', '.card' , (event) => {
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
            setTimeout(() => {
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

// Clears all the current data in the arrays before appending new data.
function clear() {
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

// Function iterates through allPokemonImgUrl array and appends the output.
function output() {
    $('#output').append(allPokemonImgUrl.map(pokemonUrl =>
        
        (`
        <div class="col-4 col-sm-3 card-container pb-1">
        <div class="card mx-auto">
        <div class="pokemoncard-back transformation"</div>
        <div class="pokemoncard-front transformation"><img class="pokemon" src="${[pokemonUrl]}"></div>
        </div>
        </div>
        `)

    ))
  }
  

// Get the API link with a random Pokémon (number).
async function getImageUrl(number) {
  
    const data = await fetch(pokemonDataUrl + number).then(r => r.json());
  
    return data.sprites.front_default;
}

// Fetch the data from the Pokémon API and push into the array with double values of each and then append the data with the output function.
async function fetchPokemonData(difficulty) {
  
     // create array of numbers
    const numbers = new Array(difficulty).fill(0).map(() => randomNumber());
  
    // create array of promises from numbers, await them all
    await Promise.all(numbers.map(number => getImageUrl(number)))
      .then(result => {
        allPokemonImgUrl = [...result, ...result];
      })
      .then(() => Shuffle(allPokemonImgUrl))
      .catch(error => console.log(error));
  
    output(allPokemonImgUrl);
  
}

/* This function copies the array so that we always have two of the same cards. 
Then concat into a new array and shuffles it. After that it Checks the amount of cards 
in the CheckCards function */
function startGame(){
    
    $victory.hide(); // Hides the victory. 
    $turnCounter.hide(); // Hides the turns count.
    $startPage.hide(); // Hides the startPage when game starts. 
    $('#game-sidebarCollapse').show();
    $('#game-sidebar').toggleClass('active');
    $('#sidebarCollapse').hide();
    $('#output').show();
    $turnCounter.show(); // Shows the turns count.
    $('.counted-turns').text('Flips: 0') // Shows the standard counted turns.
    $('#sidebarCollapse').show();

}


// Start the game.
    playGame();
    
// Enable Mute button.
    muteAll();
 
// Enable sound On.
    soundOn();

/* Events for clicking on game levels. It iterates to check how many cards it needs
and calls functions accordingly. */


$('#easy').on('click', () => {

    fetchPokemonData(easy);
    startGame();
    clear();
  
})

$('#medium').on('click', () => {

    fetchPokemonData(medium);
    startGame();
    clear();
  
})

$('#hard').on('click', () => {

    fetchPokemonData(hard);
    startGame();
    clear();
  
})

$('#extreme').on('click', () => {

    fetchPokemonData(extreme);
    startGame();
    clear();
  
})
   

