let programming_langauges = [   "python",
                                "delphi",                           
                                "javascript",
                                "c",
                                "typescript",
                                "php",
                                "ruby",
                                "scala",
                                "kotlin",
                                "haskell",
                                "sql"
                            ];

programming_langauges = programming_langauges.join(',').toUpperCase().split(',')
let answer = '';
const failures = 6;
let mistake = 0;
let guess = [];
let word_status = null;
const loseSound = () => new Audio('./sounds/lose.wav')
const victorySound = () => new Audio('./sounds/victory.mp3')

//function to select a random answe
function chooseProgamming(){
    answer = programming_langauges[Math.floor(Math.random()*programming_langauges.length)];
}
//function to create keyboard
function createKeyboard(){
    let node = document.getElementById('keyboard')
    let buttonHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
        <button class ="button col-sm-1 m-2 "
        id= "` + letter + `"
        onClick = "handleGuess('` + letter + `')"
        >
        `+ letter +`
        </button>
        `).join('')
    node.innerHTML = buttonHTML
    
}
//function to check if a guess is rigth or wrong
function handleGuess(choosenLetter){
    //if chosen letter is right -> push the letter in guess.
    //else doing nothing
    guess.indexOf(choosenLetter) === -1 ? guess.push(choosenLetter) : null;
   let node = document.getElementById(choosenLetter)
   //make button disabled after it is choosen.
    node.setAttribute('disabled',true);
    node.className = node.className + "disabled"
    // if player make a rigth guess
    if(answer.indexOf(choosenLetter) >= 0){
        getWord();
        checkGameWon();
    //if player make a wrong guess
    }else if(answer.indexOf(choosenLetter) === -1){
        mistake++;
        updateMistake();
        updatePicture();
        checkGameOver();
    }
}
//function to display guessed word in answer
function getWord(){
//map through the answer and if any guessed letters matched with letter in answers, it will display the letters.
//else it will display '_'
    word_status  = answer.split('').map(letter=>(guess.indexOf(letter)>= 0 ? letter : "_ ")).join('');
    document.getElementById('word-spotLight').innerHTML = word_status
}
//function to display failures
function updateMistake(){
    if(mistake <=1){
        document.getElementById('mistake').innerHTML = `${mistake} failure`
    }else{
        document.getElementById('mistake').innerHTML = `${mistake} failures`
    }
    
}
//function to check if the player already won or not.
function checkGameWon(){
    if(word_status === answer){
        let node = document.getElementById('keyboard')
        node.className = "text-result";
        node.innerHTML = "You Won";
        victorySound().play();
        alert("Congratulation! You win!");
    }
    
}
//function to check if the player already lost or not.
function checkGameOver(){
    if(mistake === failures){
        let node = document.getElementById('keyboard')
        node.className =  "text-result"
        node.innerHTML = "You Lost";
        loseSound().play();
        alert("Better luck next time...");
    }
    
}
//function to update the picture
function updatePicture(){
    document.getElementById('hangman-pic').src = './images/hngm'+mistake+'.jpg'
}
//function to reset on the button
function reset(){
    mistake = 0;
    guess = [];
    let node = document.getElementById('keyboard')
    node.className = "row mb-5"
    chooseProgamming();
    getWord();
    document.getElementById('hangman-pic').src = './images/hngm0.jpg'
    updateMistake();
    createKeyboard();
}

//Start function
chooseProgamming();
getWord();
document.getElementById('hangman-pic').src = './images/hngm0.jpg'
createKeyboard();


