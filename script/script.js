///////////////////////////////Step 1 - Set up the game

//Create variables to hold the object array, the current 
//object number and the current score
var objs = [];
var currentObjectID = 0;
var currentScore = 0;

//Set up the document.ready by calling the 
//method that begins the game - beginGame()
$(document).ready(function () {
    beginGame();
});

//Create a function that builds an object array
//that contains all of the locations,
//then call a function that sets up the page for 
//the first time i.e populating the first image, 
//question buttons, current score etc.
function beginGame() {
    objs = BuildObjectArray();
    populatePageContent(0);
}

//Create a function called populatePageContent
//that populates the image, answer buttons and score
//for the current question. This should
//take an argument of the current question
//number minus 1 (since the question #1 is array element 0).
function populatePageContent(objId) {
    $('#answer1').attr('data-correct', 'false');
    $('#answer2').attr('data-correct', 'false');
    $('#answer3').attr('data-correct', 'false');

    var answerNumber = getRandomArbitrary(1, 3);
    $('#locationImage').attr('src', objs[objId].locationImage);
    $('#value' + answerNumber).text(objs[objId].locationDescription);
    $('#answer' + answerNumber).attr('data-correct', 'true');

    if (answerNumber === 1) {
        $('#value' + 2).text(objs[objId].wrongAnswer1);
        $('#value' + 3).text(objs[objId].wrongAnswer2);
    }
    if (answerNumber === 2) {
        $('#value' + 1).text(objs[objId].wrongAnswer1);
        $('#value' + 3).text(objs[objId].wrongAnswer2);
    }
    if (answerNumber === 3) {
        $('#value' + 1).text(objs[objId].wrongAnswer1);
        $('#value' + 2).text(objs[objId].wrongAnswer2);
    }
}

//Create a function that creates (5) or more Javascript objects.
//Each object should have properties that contain data used
//by the game for each question. Each object should be assigned to 
//a new variable
//Once the objects have been created and the variables assigned
//the variables should be loaded into the object array variable
//created in step 1
function BuildObjectArray() {
    var place1 = {
        locationName: "Disney",
        locationDescription: "Disney Land",
        location: "Anaheim, CA",
        locationImage: "image/Disney.jpg",
        wrongAnswer1: "Eiffel Tower",
        wrongAnswer2: "The Alamo"
    };

    var place2 = {
        locationName: "Giza",
        locationDescription: "The Pyramids at Giza",
        location: "Giza Egypt",
        locationImage: "image/Giza.jpg",
        wrongAnswer1: "San Diego",
        wrongAnswer2: "Las Vegas"
    };

    var place3 = {
        locationName: "Louvre",
        locationDescription: "The Louvre",
        location: "Paris France",
        locationImage: "image/Louvre.jpg",
        wrongAnswer1: "Eiffel Tower",
        wrongAnswer2: "Madison Square Garden"
    };

    var place4 = {
        locationName: "Taj Mahal",
        locationDescription: "The Taj Mahal",
        location: "Agra, India",
        locationImage: "image/tajmahal.jpg",
        wrongAnswer1: "Disney World",
        wrongAnswer2: "Miami Beach"
    };

    var place5 = {
        locationName: "Waikiki",
        locationDescription: "Waikiki Beach",
        location: "Honolulu, HI",
        locationImage: "image/WaikikiBeach.jpg",
        wrongAnswer1: "Pismo Beach",
        wrongAnswer2: "North Pole"
    };

    objs = [place1, place2, place3, place4, place5];
    return objs;
}


///////////////////////////////Step 2 - Play the game

//Create a function that calls methods to present
//a populated modal dialog showing the results
//to the user, and processing the state of the page
//This method is called by the onclick of a listitem in
//the HTML page, and so it shouldn't contain any logic
//It should just call other methods that do the actual
//work.
function checkAnswer(e) {
    processModal(e);
    setGameState();
}
//Create a function that processes the Modal Dialog that tells
//the user whether they selected the right answer, and what
//the points awarded are.
function processModal(e) {
    if ($('#' + e.id).attr('data-correct') === 'true') {
        currentScore = currentScore + 5;
        $('#modalHeader').removeClass('modalHeader-incorrect');
        $('#modalHeader').addClass('modalHeader-correct');
        $('#modalTitle').html('Correct');
        $('#modalMessage').html('The correct answer is ' + objs[currentObjectID].locationDescription
            + ', which is located in ' + objs[currentObjectID].location);
        $('#modalScore').html('Score: 5 points');
        $('#result').html('Your score is: ' + currentScore);
    }
    else {
        $('#modalTitle').html('Incorrect');
        $('#modalHeader').removeClass('modalHeader-correct');
        $('#modalHeader').addClass('modalHeader-incorrect');
        $('#modalMessage').html('The correct answer is ' + objs[currentObjectID].locationDescription
            + ', which is located in ' + objs[currentObjectID].location);
        $('#modalScore').html('Score: 0 points');
        $('#result').html('Your score is: ' + currentScore);
    }
}

//Determine what array element is the currentObjectID
//and, depending on whether we are at the last element
//or not, move to the next element or set up the page
//to finish the game
function setGameState() {
    if (currentObjectID === objs.length - 1) {
        finishGame();
    }
    else { setCurrentObjectID(currentObjectID + 1); }
    populatePageContent(currentObjectID);
}

///////////////////////////////Step 3 - Finish the game

//Set up the UI for finishing the game
//by hiding answer buttons and showing
//play again button
function finishGame() {

    $('#answers').addClass('hidden');
    $('#playButton').removeClass('hidden');
}

///////////////////////////////Helper methods

//This method provides a single place
//to change the currentObjectID variable
function setCurrentObjectID(val) {
    currentObjectID = val;
}

//This method returns an integer between 1 and 3
//That's all it does, but it's used by another process
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
