# MixMatch - Memory Game
This game is fun and suits young and elder pokémon fans! You can choose how difficult you want it to be and it will always generate random pokémons for you.
# UX - Match the Pokémons
This is a mobile-first approach game that generates random pokémon cards for you to match. It is a single page app and looks great on mobile devices.

### Drafts (Wireframes)
* [Desktop](https://tomost2019.github.io/MixMatch/assets/images/wireframes/MixMatch_GameCards.png)
* [Mobile-First Approach](https://tomost2019.github.io/MixMatch/assets/images/wireframes/MixMatch_Mobile.png)

### User Stories

1. As a younger user I would like to have fun while learning and a memory game is perfect for that! With a theme that everyone can relate to. 
2. A user who wants to exercise the brain by doing a fun memory game. 
3. A perfect fun game for users who want something to do while they wait. 

## Technologies Used
* HTML - The foundation.
* CSS - Custom styling.
* Javascript - Making interactive apps. 
* jQuery - JS Library.
* Bootstrap 4 - Layout and responsiveness.
* Git - Version Control.
* Github - Deployment.
* Visual Studio - IDE.

### Features

#### Sidebar
A sidebar where the user can choose the level of difficulty. Saves space from the navbar.
#### Navbar
A navbar where the user can reset the game or control the audio.
#### Start Page
Some short general information on how the game works and how to start the game. 
#### Game section
All the pokemon cards are displayed with a user friendly layout with a minimalist navbar. All the focus are on the cards. 
#### Victory
The victory page shows when all the cards are matched with information on how to reset the game. The sidebar pops up enabling the user to start the game again. 


### Implemented Features

* The MixMatch app is getting the pokemon data and images from the PokéAPI.


### Future Development
* Adding more information from the PokéApi. 


## Testing
I did some extensive testing of the website several times. I used Chrome Debugger. I tested the website in Chrome, Firefox, Safari and Edge. The hardware I tested on was PC, iPhone, Android Device and Mac.

In Chrome Debugger I used the responsive method to resize the window to see how everything looked. I also used it for checking how it would look on different mobile devices.

### Testing Client Stories

#### Young users 
The cards generate random pokémon for every game. The cards are bigger on tablet sizes and up.
#### Brain exercise
The user can choose from 4 difficulty levels.
#### Time consuming
It's easy to spend some time fliping cards and match them all. It generates random pokemons from the PokéApi so there is always some fun to see!




### Automated

[HTML Validator W3](https://validator.w3.org)<br>
[W3 CSS Validator](https://jigsaw.w3.org/css-validator/)<br>
[Javascript](https://codebeautify.org/jsvalidate)<br>
[Autiprefixer CSS Validator](https://autoprefixer.github.io/)



### Manual Testing

I have played the game on several devices. In standard mode and potrait mode. Tested all the difficulty levels several times. Trying to double click on cards and buttons to disrupt the gameplay. 

### Unit Testing
You could use Jasmine as a framework to test the JS Code. However I need to do some more studying and research before I can fully apply it and it will be noticable in future projects. 

### Known Bugs
It happens sometimes that the user will get uneven cards and can not match all the cards. This is because the function startGame did not finish until the setTimeOut ran out.

Not related to any specific browser. 

**Possible solutions:**
* Using callback functions instead of setTimeOut.
* Create a statement to check if all the cards are in the array. If not then display error and let the user to try again.

### Performance
I optimized the images on the website for best performance. I measured the performance using the Chrome Debugger with network and the performance tab.

## Deployment
I deployed this project by using Github Pages:

1. Log into Github
2. Select the MixMatch repository
3. Go to Settings > Github Pages
4. Choose: Source > Master branch
5. The Github page is now deployed. Retrive the link and paste it in the description.

*You can also fork the project to get a copy to your Github account. Deploy Github pages as above*

**Run Locally**

[Cloning a repository](https://help.github.com/en/articles/cloning-a-repository)


## Credits
**Research:**

[Github](https://www.github.com)<br>
[Stackoverflow](https://stackoverflow.com)<br>
[CSS-Tricks](https://www.css-tricks.com)<br>
[Bootstrap](https://www.getbootstrap.com)<br>
[jQuery](https://jquery.com/)<br>
[W3 Schools](https://www.w3schools.com/)

**Other:**

Code Institute

### Content
All content on this website is written by me.

### Media

[Gifs](https://giphy.com/)<br>
[Pokémoncard Back](https://www.deviantart.com/atomicmonkeytcg/art/Pokemon-Card-Backside-in-High-Resolution-633406210)<br>
[Pokémons](https://pokeapi.com/)<br>
[Audio](https://www.youtube.com/watch?v=P8T6gh9p2-c)

### Acknowledgements

[Fontawesome](https://www.fontawesome.com)<br> 

## Disclaimer
This is my second milestone project (interactive frontend). The stories and all the content, music and images has no connections. The project is a part of my portfolio. 

