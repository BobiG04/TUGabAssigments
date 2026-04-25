var app = new Framework7({
  el: '#app',
  theme: 'auto',
});

// ПРОМЯНА 1: Извикваме функцията за настройки веднага след старта
initSettings();

const API_KEY = '';

// Промяна на заглавието при смяна на табовете
app.on('tabShow', function (tabEl) {
  const titles = { 'tab-compass': 'Компас', 'tab-sensors': 'Сензори', 'tab-map': 'Карта', 'tab-settings': 'Настройки' };
  document.getElementById('nav-title').innerText = titles[tabEl.id];
});

function initApp() {
  // 1. Компас и Ориентация
  window.addEventListener('deviceorientation', function (e) {
    // 1. КОМПАС (съществуващ код)
    let heading = e.webkitCompassHeading || (360 - e.alpha);
    document.getElementById('compass-dial').style.transform = `rotate(${-heading}deg)`;
    document.getElementById('heading-value').innerText = Math.round(heading) + '°';

    // 2. АКСЕЛЕРОМЕТЪР (Наклон)
    // Взимаме стойностите за наклон (по подразбиране 0, ако няма данни)
    let beta = e.beta || 0;   // Наклон напред/назад [-180, 180]
    let gamma = e.gamma || 0; // Наклон наляво/надясно [-90, 90]

    // Показваме точните градуси в таб "Сензори"
    document.getElementById('beta-val').innerText = Math.round(beta);
    document.getElementById('gamma-val').innerText = Math.round(gamma);

    // Изчисляване на позицията по условие
    let pos = "наклонен";

    // Ако екранът гледа право нагоре (позволяваме отклонение до 15 градуса)
    if (Math.abs(beta) < 15 && Math.abs(gamma) < 15) {
      pos = "към небето";
    }
    // Ако екранът гледа право надолу към земята (beta е около 180 или -180)
    else if (Math.abs(beta) > 165 && Math.abs(gamma) < 15) {
      pos = "към земята";
    }

    // Обновяваме текста за позицията и в двата таба
    if (document.getElementById('orientation-status')) {
      document.getElementById('orientation-status').innerText = pos;
    }
    if (document.getElementById('sensor-orientation')) {
      document.getElementById('sensor-orientation').innerText = pos;
    }
  });

  // 2. GPS
  navigator.geolocation.watchPosition(function (p) {
    const coords = p.coords;
    document.getElementById('lat').innerText = coords.latitude.toFixed(5);
    document.getElementById('lng').innerText = coords.longitude.toFixed(5);
    document.getElementById('alt').innerText = coords.altitude ? coords.altitude.toFixed(1) : '0';
    document.getElementById('speed').innerText = coords.speed ? coords.speed.toFixed(1) : '0';

    // Обновяване на картата и адреса
    updateMapAndAddress(coords.latitude, coords.longitude);
  }, null, { enableHighAccuracy: true });
}

function updateMapAndAddress(lat, lng) {
  if (!API_KEY) return;

  // Static Map
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x400&markers=color:red%7C${lat},${lng}&key=${API_KEY}`;
  const mapImg = document.getElementById('static-map');
  mapImg.src = mapUrl;
  mapImg.style.display = 'block';

  // Geocoding (Адрес)
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&language=bg`)
    .then(r => r.json())
    .then(d => {
      if (d.results[0]) document.getElementById('address-text').innerText = d.results[0].formatted_address;
    });
}

function initSettings() {
  const darkToggle = document.getElementById('setting-dark');
  const gpsToggle = document.getElementById('setting-gps');
  const langSelect = document.getElementById('setting-lang');

  // 1. ЗАРЕЖДАНЕ на запазените настройки от localStorage
  const isDark = localStorage.getItem('darkMode') === 'true';
  const isGpsHigh = localStorage.getItem('gpsHigh') !== 'false'; // по подразбиране е true
  const savedLang = localStorage.getItem('appLang') || 'bg';

  // 2. ПРИЛАГАНЕ на настройките върху UI (бутоните)
  darkToggle.checked = isDark;
  gpsToggle.checked = isGpsHigh;
  langSelect.value = savedLang;

  // Прилагане на тъмния режим визуално
  if (isDark) {
    document.documentElement.classList.add('dark');
  }

  // 3. СЛУШАНЕ ЗА ПРОМЕНИ (когато потребителят цъкне нещо)

  // При цъкане на Тъмен режим
  darkToggle.addEventListener('change', function (e) {
    const checked = e.target.checked;
    localStorage.setItem('darkMode', checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  // При цъкане на GPS точност
  gpsToggle.addEventListener('change', function (e) {
    localStorage.setItem('gpsHigh', e.target.checked);
    // За да влезе в сила веднага, тук по принцип се рестартира navigator.geolocation.watchPosition
  });

  // При смяна на Език
  langSelect.addEventListener('change', function (e) {
    localStorage.setItem('appLang', e.target.value);
    app.toast.create({
      text: 'Езикът е запазен. Ще се приложи при рестарт.',
      closeTimeout: 3000,
      position: 'bottom'
    }).open();
  });
}

initApp();