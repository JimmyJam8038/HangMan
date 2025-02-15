const word = ["apple", "banana", "carrot", "dog", "elephant", "fish", "giraffe", "honey", "igloo", "jacket",
    "kite", "lemon", "mountain", "notebook", "orange", "piano", "quilt", "rose", "sunflower", "tree",
    "umbrella", "violin", "whale", "xylophone", "yacht", "zebra", "adventure", "brave", "courage", "dream",
    "energy", "fantasy", "genuine", "hope", "imagination", "joy", "kindness", "laughter", "mystery", "nature",
    "ocean", "peace", "quest", "rainbow", "sparkle", "trust", "universe", "victory", "wonder", "yarn",
    "zest", "amber", "blossom", "candle", "dawn", "echo", "flame", "glimmer", "harmony", "inspire",
    "jewel", "kaleidoscope", "light", "moon", "nest", "oasis", "petal", "quasar", "river", "star",
    "tide", "utopia", "vivid", "whisper", "azure", "breeze", "cloud", "dusk", "ember", "frost",
    "gem", "horizon", "island", "jungle", "key", "leaf", "mosaic", "nectar", "opal", "quicksilver",
    "rosebud", "sapphire", "tangerine", "unicorn", "violet", "wish", "yonder", "zenith", "adorn", "bloom",
    "courageous", "delightful", "effervescent", "flourish", "glistening", "happiness", "illuminate", "jubilant", "kinder", "luminescent",
    "melody", "novel", "optimistic", "playful", "quaint", "radiant", "serenade", "tranquil", "uplift", "vibrant",
    "whimsical", "xenial", "yearn", "zephyr", "artistry", "balance", "canvas", "daring", "elegance", "finesse",
    "graceful", "hues", "intrigue", "jovial", "kudos", "legacy", "mirth", "nurture", "opulent", "plush",
    "quench", "resilience", "serendipity", "tenacity", "unity", "versatile", "wisdom", "x-factor", "youthful", "zeal",
    "abundance", "bounty", "clarity", "depth", "exuberance", "fervor", "glow", "heartfelt", "infinity", "jubilance",
    "keystone", "luminary", "mojo", "nexus", "oracle", "pinnacle", "quicksand", "revive", "sublime", "transcend",
    "uplifted", "vortex", "whirlwind", "xenon", "yoke", "zodiac", "aspire", "bliss", "catharsis", "diligence",
    "euphoria", "fable", "gravity", "horizon", "invigorate", "jigsaw", "kaleidoscopic", "labyrinth", "melancholy", "novelty",
    "overture", "paradise", "quasar", "reverie", "synthesis", "traverse", "unveil", "vanguard", "whimsy", "xenophobic",
    "yearning", "zealot", "alchemy", "basking", "cascading", "dappled", "eclipse", "fable", "gossamer", "halcyon"];
    
    let chosen = word[Math.floor(Math.random() * word.length)];
    console.log(chosen);
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