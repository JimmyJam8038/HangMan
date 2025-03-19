var words = []
words = JSON.parse(localStorage.getItem("word3")) 
    
    let chosen = words[Math.floor(Math.random() * words.length)];
    console.log(chosen);
if (words.length == 0){
    console.log("no words")
    window.location.href = "index.html"
}
    let maskedWord = "_ ".repeat(chosen.length);
    document.getElementById("wordDisplay").innerHTML = maskedWord;
    let attempts = 7;
    
    const alphabet = 'qwertyuiopasdfghjklzxcvbnm'.split('');
    let keyboardDiv = document.getElementById("keyboard");
    
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter.toUpperCase();
        button.addEventListener('click', () => guessLetter(letter, button));
        keyboardDiv.appendChild(button);
        if (letter === 'p' || letter === 'l') {
            keyboardDiv.appendChild(document.createElement('br'));
        }
    });
    
    function guessLetter(letter, button) {
        if (chosen.includes(letter)) {
            button.classList.add("correct");
            revealLetter(letter);
        } else {
            button.classList.add("incorrect");
            attempts--;
            updateHangmanImage();
            document.getElementById("scoreBoard").innerHTML = "Number of Attempts left: " + attempts;
    
            if (attempts === 0) {
                document.getElementById("wordDisplay").innerHTML = "Game Over! The word was " + chosen;
                disableKeyboard();
            }
        }
    }
    
    function revealLetter(letter) {
        let displayWord = "";
        for (let i = 0; i < chosen.length; i++) {
            if (chosen[i] === letter) {
                displayWord += letter + " ";
            } else {
                displayWord += maskedWord[i * 2] + " ";
            }
        }
        maskedWord = displayWord;
        document.getElementById("wordDisplay").innerHTML = maskedWord;
        if (!maskedWord.includes("_")) {
            document.getElementById("wordDisplay").innerHTML = `🎉 Congratulations! You guessed the word: <strong>${chosen}</strong>`;
            disableKeyboard();
        }
    }
    
    function updateHangmanImage() {
        const sequence = 8 - attempts;
        document.getElementById("hangmanImg").src = "hangman" + sequence + ".png";
    }
    
    function disableKeyboard() {
        const buttons = document.querySelectorAll(".keyboard button");
        buttons.forEach(button => {
            button.setAttribute("disabled", "disabled");
        });
        const button = document.createElement("button");
        button.textContent = "Next Word";
        button.addEventListener("click", function () {
            location.reload();
        }); 
        keyboardDiv.appendChild(button);
        words = words.filter(word => word !== chosen)
        localStorage.setItem('word3',JSON.stringify(words))
    }
    
    function control(event) {
        console.log("key: " + event.key);
        const buttons = document.querySelectorAll(".keyboard button");
        
        buttons.forEach(button => {
            if (button.textContent.toUpperCase() === event.key.toUpperCase()) {
                guessLetter(event.key, button);
            }
        });
    }
    
    document.addEventListener("keydown", control);

