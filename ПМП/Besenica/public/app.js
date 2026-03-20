let currentWord = "";
let guessedLetters = [];
let lives = 6;
let isGameOver = false;

const wordDisplay = document.getElementById("word-display");
const livesDisplay = document.getElementById("lives-display");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const messageBox = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");
const categorySelect = document.getElementById("category-select");

// Нови елементи
const langSelect = document.getElementById("language-select");
const diffSelect = document.getElementById("difficulty-select");
const memeImage = document.getElementById("meme-image");

// Масив с Meme снимки (замести тези линкове с реални забавни снимки или локални пътища)
const memeUrls = [
    "./images/0.jpg", // 0 животи
    "./images/1.jpg", // 1 живот
    "./images/2.jpg", // 2 животи
    "./images/3.jpg", // 3 животи
    "./images/4.jpg", // 4 животи
    "./images/5.jpg", // 5 животи
    "./images/6.jpg"  // 6 животи
];

async function initGame() {
    isGameOver = false;
    lives = 6;
    guessedLetters = [];
    guessInput.value = "";
    guessInput.disabled = false;
    guessBtn.disabled = false;
    messageBox.className = "alert d-none";
    restartBtn.classList.add("d-none");
    livesDisplay.innerText = lives;
    memeImage.src = memeUrls[6]; 
    wordDisplay.classList.remove("text-danger"); // ВРЪЩАМЕ ЦВЕТА НА ДУМАТА В НОРМАЛЕН

    const lang = langSelect.value;
    const diff = diffSelect.value;
    const category = categorySelect.value; // Взимаме категорията

    try {
        // Изпращаме заявка с параметри
        const response = await fetch(`/api/word?lang=${lang}&diff=${diff}&category=${category}`);
        const data = await response.json();
        
        if (response.ok) {
            currentWord = data.word;
            updateWordDisplay();
        } else {
            showMessage(data.error, "danger");
        }
    } catch (err) {
        showMessage("Грешка при зареждане на думата.", "danger");
    }
}

// Функцията updateWordDisplay остава същата като преди
function updateWordDisplay() {
    let display = "";
    let isWordGuessed = true;

    for (let char of currentWord) {
        if (guessedLetters.includes(char)) {
            display += char;
        } else {
            display += "_";
            isWordGuessed = false;
        }
    }

    wordDisplay.innerText = display;

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
            endGame(true);
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

        if (!currentWord.includes(guess)) {
            reduceLife(`Буквата "${guess}" не се съдържа в думата.`);
        } else {
            messageBox.classList.add("d-none");
        }

        updateWordDisplay();
    }
}

// Нова помощна функция за намаляване на живот и смяна на meme-то
function reduceLife(msg) {
    lives--;
    livesDisplay.innerText = lives;
    memeImage.src = memeUrls[lives]; // Сменяме снимката спрямо оставащите животи
    showMessage(msg, "warning");

    if (lives <= 0) {
        endGame(false);
    }
}

function endGame(isWin) {
    isGameOver = true;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    restartBtn.classList.remove("d-none");

    if (isWin) {
        memeImage.src = "./images/w.jpg"; // Снимка за победа (замени с реална)
        showMessage("Поздравления! Ти позна думата!", "success");
    } else {
        wordDisplay.innerText = currentWord; // Показваме цялата дума
        wordDisplay.classList.add("text-danger"); // Правим я червена за акцент
        showMessage(`Край на играта! Търсената дума беше: ${currentWord}`, "danger");
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