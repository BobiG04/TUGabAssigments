const GOOGLE_API_KEY = ""; 
let currentLang = 'bg'; // Пази текущия език за динамичните текстове

// === РЕЧНИК С ПРЕВОДИ ===
const translations = {
    bg: {
        tab_map: "Карта", tab_sensor: "Сензор", tab_compass: "Компас", tab_settings: "Настройки",
        gps_title: "GPS Данни", coords: "Координати:", alt: "Височина:", speed: "Скорост:",
        loc_title: "Локация", searching: "Търсене...", waiting: "Очакване на данни...",
        accel_title: "Данни от акселерометъра", orientation: "Ориентация:", unknown: "Неизвестна",
        acc_x: "Ускорение X:", acc_y: "Ускорение Y:", acc_z: "Ускорение Z (Гравитация):",
        compass_title: "Компас", direction: "Посока:", compass_hint: "Завърти телефона около оста му.",
        settings_title: "Настройки", dark_mode: "Тъмен режим", app_lang: "Език на приложението",
        state_tilted: "наклонен", state_up: "към небето", state_down: "към земята", not_supported: "Не се поддържа"
    },
    en: {
        tab_map: "Map", tab_sensor: "Sensor", tab_compass: "Compass", tab_settings: "Settings",
        gps_title: "GPS Data", coords: "Coordinates:", alt: "Altitude:", speed: "Speed:",
        loc_title: "Location", searching: "Searching...", waiting: "Waiting for data...",
        accel_title: "Accelerometer Data", orientation: "Orientation:", unknown: "Unknown",
        acc_x: "Acceleration X:", acc_y: "Acceleration Y:", acc_z: "Acceleration Z (Gravity):",
        compass_title: "Compass", direction: "Heading:", compass_hint: "Rotate the phone around its axis.",
        settings_title: "Settings", dark_mode: "Dark Mode", app_lang: "App Language",
        state_tilted: "tilted", state_up: "facing sky", state_down: "facing ground", not_supported: "Not supported"
    }
};

document.addEventListener('deviceready', onDeviceReady, false);
if (!window.cordova) { window.onload = onDeviceReady; }

function onDeviceReady() {
    loadSettings();
    initSensors();
    initGPS();
}

function openTab(evt, tabId) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) tabContents[i].classList.remove("active-tab");

    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) tabBtns[i].classList.remove("active");

    document.getElementById(tabId).classList.add("active-tab");
    evt.currentTarget.classList.add("active");
}

// === ЛОГИКА ЗА НАСТРОЙКИ И ПРЕВОД ===
function loadSettings() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').checked = true;
    }

    currentLang = localStorage.getItem('appLanguage') || 'bg';
    document.getElementById('languageSelect').value = currentLang;
    
    applyTranslations(currentLang);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function changeLanguage() {
    currentLang = document.getElementById('languageSelect').value;
    localStorage.setItem('appLanguage', currentLang);
    applyTranslations(currentLang);
}

// Функцията, която обикаля HTML-а и сменя текстовете
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Ако нямаме координати, искаме да преведем и съобщението за грешка/търсене
    if (document.getElementById('coords').innerText === "Търсене..." || document.getElementById('coords').innerText === "Searching...") {
        document.getElementById('coords').innerText = translations[lang].searching;
    }
}

// === ЛОГИКА ЗА СЕНЗОРИТЕ ===
function initSensors() {
    window.addEventListener('devicemotion', (e) => {
        if (!e.accelerationIncludingGravity) return;
        let x = e.accelerationIncludingGravity.x || 0;
        let y = e.accelerationIncludingGravity.y || 0;
        let z = e.accelerationIncludingGravity.z || 0;

        document.getElementById('acc-x').innerText = x.toFixed(2);
        document.getElementById('acc-y').innerText = y.toFixed(2);
        document.getElementById('acc-z').innerText = z.toFixed(2);

        // Динамичен превод на ориентацията
        let stateKey = "state_tilted";
        if (z > 8.5) stateKey = "state_up";
        else if (z < -8.5) stateKey = "state_down";
        
        document.getElementById('orientation').innerText = translations[currentLang][stateKey];
    }, true);

    window.addEventListener('deviceorientation', (e) => {
        let heading = e.webkitCompassHeading || e.alpha;
        if (heading !== null) {
            let roundedHeading = Math.round(heading);
            document.getElementById('compass').innerText = roundedHeading;

            // Въртим САМО стрелката по средата
            const compassArrow = document.getElementById('compass-arrow');
            if (compassArrow) {
                compassArrow.style.transform = `rotate(${-roundedHeading}deg)`;
            }
        }
    }, true);
}

// === ЛОГИКА ЗА GPS И КАРТА ===
let lastLat = 0, lastLng = 0;

function initGPS() {
    if (!navigator.geolocation) {
        document.getElementById('coords').innerText = translations[currentLang].not_supported;
        return;
    }

    navigator.geolocation.watchPosition(
        (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            document.getElementById('coords').innerText = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            document.getElementById('alt').innerText = (pos.coords.altitude || 0).toFixed(1);
            document.getElementById('speed').innerText = (pos.coords.speed || 0).toFixed(1);
            updateMap(lat, lng);
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

function updateMap(lat, lng) {
    if (Math.abs(lastLat - lat) < 0.0001 && Math.abs(lastLng - lng) < 0.0001) return;
    lastLat = lat; lastLng = lng;

    if (!GOOGLE_API_KEY || GOOGLE_API_KEY === "ТВОЯТ_API_КЛЮЧ_ТУК") return;

    const mapImg = document.getElementById('map');
    mapImg.src = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=18&size=600x400&markers=color:blue%7Csize:small%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    mapImg.style.display = "block";

    // Подаваме езика и на Google Maps API-то (language=bg или language=en)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=${currentLang}&key=${GOOGLE_API_KEY}`)
        .then(r => r.json())
        .then(data => {
            if (data.status === "OK" && data.results[0]) {
                document.getElementById('address').innerText = data.results[0].formatted_address;
            }
        });
}