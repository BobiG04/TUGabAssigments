let currentWord = "";
let guessedLetters = [];
let lives = 6;
let isGameOver = false;

const wordDisplay = document.getElementById("wordDisplay"); // Беше "word-display"
const guessInput = document.getElementById("guessInput"); // Беше "guess-input"
const guessBtn = document.getElementById("guessBtn"); // Беше "guess-btn"
const messageBox = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");
const categorySelect = document.getElementById("category-select");
const usedLettersDisplay = document.getElementById("usedLettersDisplay");

const livesDisplay = document.getElementById("lives-display");

// Нови елементи
const langSelect = document.getElementById("language-select");
const diffSelect = document.getElementById("difficulty-select");
const memeImage = document.getElementById("meme-image");

// --- Звукови ефекти ---
const correctSound = new Audio('audio/correct.mp3');
const wrongSound = new Audio('audio/wrong.mp3');
const winSound = new Audio('audio/win.mp3');
const loseSound = new Audio('audio/lose.mp3');

// Масив с Meme снимки
const memeUrls = [
    "images/0.jpg", // 0 животи
    "images/1.jpg", // 1 живот
    "images/2.jpg", // 2 животи
    "images/3.jpg", // 3 животи
    "images/4.jpg", // 4 животи
    "images/5.jpg", // 5 животи
    "images/6.jpg"  // 6 животи
];

async function initGame() {
    isGameOver = false;
    lives = 6;
    guessedLetters = [];
    currentWord = ""; // Изчистваме старата дума веднага
    
    guessInput.value = "";
    // ЗАКЛЮЧВАМЕ полето и бутона, докато сървърът не върне дума
    guessInput.disabled = true; 
    guessBtn.disabled = true; 
    
    messageBox.className = "alert d-none";
    restartBtn.classList.add("d-none");
    livesDisplay.innerText = lives;
    memeImage.src = memeUrls[6]; 
    
    wordDisplay.classList.remove("text-danger"); 
    // Показваме, че се зарежда
    wordDisplay.innerText = "ЗАРЕЖДАНЕ..."; 
    usedLettersDisplay.innerText = "";

    winSound.pause();
    winSound.currentTime = 0;
    loseSound.pause();
    loseSound.currentTime = 0;

    const lang = langSelect.value;
    const diff = diffSelect.value;
    const category = categorySelect.value; 

    const backendUrl = "https://hangman-api-anmd.onrender.com";

    try {
        const response = await fetch(`${backendUrl}/api/word?lang=${lang}&diff=${diff}&category=${category}`);
        const data = await response.json();
        
        if (response.ok) {
            currentWord = data.word;
            
            // ОТКЛЮЧВАМЕ полето, защото думата е пристигнала успешно
            guessInput.disabled = false; 
            guessBtn.disabled = false; 
            
            updateWordDisplay();
        } else {
            wordDisplay.innerText = "ГРЕШКА";
            showMessage(data.error, "danger");
        }
    } catch (err) {
        wordDisplay.innerText = "ГРЕШКА";
        showMessage("Грешка при връзката със сървъра.", "danger");
    }
}
// Функцията updateWordDisplay остава същата като преди
function updateWordDisplay() {
    let display = "";
    let isWordGuessed = true;

    for (let char of currentWord) {
        if (guessedLetters.includes(char)) {
            display += char + " "; // Добавяме интервал за красота
        } else {
            display += "_ "; // Добавяме интервал между чертите
            isWordGuessed = false;
        }
    }

    // .trim() премахва излишния интервал най-накрая
    wordDisplay.innerText = display.trim();

    if (isWordGuessed && currentWord.length > 0) {
        endGame(true);
    }
}

function handleGuess() {
    if (isGameOver) return;

    const guess = guessInput.value.trim().toUpperCase();
    guessInput.value = "";

    if (!guess) return;

    if (guess.length > 1) {
        if (guess === currentWord) {
            guessedLetters = currentWord.split('');
            updateWordDisplay();
            endGame(true); // Тук автоматично ще се пусне winSound от endGame функцията
        } else {
            reduceLife(`Грешка! Думата не е "${guess}".`);
        }
    } 
    else {
        if (guessedLetters.includes(guess)) {
            showMessage("Вече си въвел тази буква!", "warning");
            return;
        }

        guessedLetters.push(guess);
        usedLettersDisplay.innerText = guessedLetters.join(", ");

        if (!currentWord.includes(guess)) {
            reduceLife(`Буквата "${guess}" не се съдържа в думата.`);
        } else {
            messageBox.classList.add("d-none");
            
            // ---> ЗВУК ЗА УСПЕХ: Добавяме го тук, когато буквата е позната <---
            correctSound.play(); 
        }

        updateWordDisplay();
    }
}

// Помощна функция за намаляване на живот и смяна на meme-то
function reduceLife(msg) {
    lives--;
    livesDisplay.innerText = lives;
    memeImage.src = memeUrls[lives]; // Сменяме снимката спрямо оставащите животи
    showMessage(msg, "warning");

    if (lives <= 0) {
        endGame(false); // Тук ще се пусне loseSound от endGame функцията
    } else {
        // ---> ЗВУК ЗА ГРЕШКА: Пускаме го, само ако играта продължава <---
        wrongSound.play(); 
    }
}

function endGame(isWin) {
    // Вътре в endGame(isWin) при победа:
    isGameOver = true;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    restartBtn.classList.remove("d-none");

    if (isWin) {
        winSound.play(); // Пускаме звук за победа
        memeImage.src = "images/w.jpg"; 
        showMessage("Поздравления! Ти позна думата!", "success");
        
        // Вибрация за победа
        if (navigator.vibrate) {
            navigator.vibrate([100, 100, 200]);
        } else if (navigator.notification && navigator.notification.vibrate) {
            navigator.notification.vibrate(400); 
        }
    } else {
        loseSound.play(); // Пускаме звук за загуба
        wordDisplay.innerText = currentWord; 
        wordDisplay.classList.add("text-danger"); 
        showMessage(`Край на играта! Търсената дума беше: ${currentWord}`, "danger");
        
        // Вибрация за загуба
        if (navigator.vibrate) {
            navigator.vibrate(500);
        } else if (navigator.notification && navigator.notification.vibrate) {
            navigator.notification.vibrate(500);
        }
    }
}

function showMessage(text, type) {
    messageBox.innerText = text;
    messageBox.className = `alert alert-${type} mt-3`;
}

guessBtn.addEventListener("click", handleGuess);
guessInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleGuess();
});
restartBtn.addEventListener("click", initGame);
langSelect.addEventListener("change", initGame); // Рестартира играта при смяна на език
diffSelect.addEventListener("change", initGame); // Рестартира играта при смяна на трудност
categorySelect.addEventListener("change", initGame); // Рестартира играта при смяна на категория

initGame();

// --- Логика за Dark Mode с localStorage ---
const themeToggleBtn = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// 1. Проверяваме дали има запазен избор в localStorage при зареждане
const savedTheme = localStorage.getItem("appTheme");
let isDarkMode = (savedTheme === "dark"); // Ако е запазено "dark", ще бъде true

// 2. Прилагаме темата веднага при стартиране
if (isDarkMode) {
    htmlElement.setAttribute('data-bs-theme', 'dark');
    if (themeToggleBtn) {
        themeToggleBtn.innerText = "☀️ Light Mode";
        themeToggleBtn.className = "btn btn-light";
    }
} else {
    htmlElement.setAttribute('data-bs-theme', 'light');
    if (themeToggleBtn) {
        themeToggleBtn.innerText = "🌙 Dark Mode";
        themeToggleBtn.className = "btn btn-dark";
    }
}

// 3. Логика при натискане на бутона
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        isDarkMode = !isDarkMode; // Обръщаме състоянието
        
        if (isDarkMode) {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            themeToggleBtn.innerText = "☀️ Light Mode";
            themeToggleBtn.className = "btn btn-light";
            // Запазваме избора в устройството
            localStorage.setItem("appTheme", "dark"); 
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
            themeToggleBtn.innerText = "🌙 Dark Mode";
            themeToggleBtn.className = "btn btn-dark";
            // Запазваме избора в устройството
            localStorage.setItem("appTheme", "light"); 
        }
    });
} else {
    console.error("ГРЕШКА: Бутонът за Dark Mode не е намерен в HTML-а!");
}