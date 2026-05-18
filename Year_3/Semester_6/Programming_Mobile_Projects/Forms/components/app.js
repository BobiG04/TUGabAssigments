// Функция за интелигентна валидация на текст
function isMeaningfulText(text) {
  if (text.length < 10) return false;
  
  // 1. Трябва да съдържа поне 2 думи (т.е. поне един интервал между символи)
  var words = text.trim().split(/\s+/);
  if (words.length < 2) return false; 
  
  // 2. Трябва да съдържа поне една гласна буква (кирилица или латиница)
  var hasVowels = /[аеиоуъюяaeiou]/i.test(text);
  if (!hasVowels) return false;
  
  // 3. Блокираме 5 или повече еднакви поредни символа (напр. "ааааа")
  var hasRepeatingChars = /(.)\1{4,}/.test(text);
  if (hasRepeatingChars) return false;

  return true;
}

// Инициализация на приложението + Рутинг
var app = new Framework7({
  root: '#app',
  name: 'SurveyApp',
  theme: 'auto',
  routes: [
    {
      path: '/stats/',
      async: function (routeTo, routeFrom, resolve, reject) {
        var template = document.getElementById('stats-page-template').innerHTML;
        resolve({ template: template }, { context: routeTo.context });
      },
      on: {
        pageInit: function (e, page) {
          var ctx = page.route.context;
          if (ctx.totalSurveys > 0) {
            
            var brCount = 0, zbCount = 0, reloadCount = 0;
            ctx.allSurveys.forEach(function(s) {
              if (s.mode === 'Battle Royale (Build)') brCount++;
              else if (s.mode === 'Zero Build') zbCount++;
              else if (s.mode === 'Reload / Creative') reloadCount++;
            });

            // 1. Филтрираме данните: Добавяме в масива само ако имат стойност > 0
            var chartData = [];
            if (brCount > 0) chartData.push({ value: brCount, color: '#059669', label: 'Battle Royale' });
            if (zbCount > 0) chartData.push({ value: zbCount, color: '#10b981', label: 'Zero Build' });
            if (reloadCount > 0) chartData.push({ value: reloadCount, color: '#34d399', label: 'Reload' });

            // Ако имаме валидни данни за рисуване
            if (chartData.length > 0) {
              // Пресмятаме общия брой за процентите
              var totalValid = chartData.reduce(function(a, b) { return a + b.value; }, 0);
              
              var gradientString = [];
              var currentAngle = 0;
              var legendHTML = '<ul>';
              
              // Генерираме ъглите за CSS Conic Gradient и HTML за легендата
              chartData.forEach(function(item) {
                var percentage = (item.value / totalValid) * 100;
                gradientString.push(item.color + ' ' + currentAngle + '% ' + (currentAngle + percentage) + '%');
                currentAngle += percentage;
                
                legendHTML += '<li><span class="color-box" style="background-color: ' + item.color + '"></span>' + item.label + ' (' + item.value + ')</li>';
              });
              legendHTML += '</ul>';

              // Прилагаме ги към DOM елементите
              setTimeout(function() {
                var pieEl = page.el.querySelector('#mode-pie-chart');
                var legendEl = page.el.querySelector('#pie-legend');
                
                if (pieEl && legendEl) {
                  pieEl.style.background = 'conic-gradient(' + gradientString.join(', ') + ')';
                  legendEl.innerHTML = legendHTML;
                }
              }, 50); // Минимално забавяне
            }
          }
        }
      }
    }
  ]
});

var $$ = Dom7;
var mainView = app.views.create('.view-main');

// Инициализация на слайдъра за FPS
var fpsSlider = app.range.create({
  el: '#fps-slider',
  min: 1, max: 10, step: 1, value: 5, label: true
});

var partialSurveys = [];
var completedSurveys = [];

// ==========================================
// УПРАВЛЕНИЕ НА ТЕМАТА С LOCALSTORAGE
// ==========================================

// 1. Проверяваме дали имаме записана тема при стартиране
var savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  $$('body').addClass('theme-dark');
  // Правим ключа зелен/активен, за да отговаря на реалността
  $$('#theme-toggle').prop('checked', true); 
}

// 2. Събитие при цъкане на ключа
$$('#theme-toggle').on('change', function (e) {
  if (e.target.checked) {
    $$('body').addClass('theme-dark');
    localStorage.setItem('theme', 'dark'); // Записваме в паметта
  } else {
    $$('body').removeClass('theme-dark');
    localStorage.setItem('theme', 'light'); // Записваме в паметта
  }
});

// СЪБИТИЕ ЗА ИЗПРАЩАНЕ НА АНКЕТАТА
$$('#submit-btn').on('click', function () {
  var formData = app.form.convertToData('#survey-form');
  var feedbackText = formData.feedback.trim();
  
  // 1. ЗАЩИТА ОТ НАПЪЛНО ПРАЗНА ФОРМА
  if (!formData.mode && formData.improvements.length === 0 && feedbackText === "") {
    app.dialog.alert('Анкетата е напълно празна. Моля, попълнете поне един отговор!', 'Внимание');
    return;
  }

  // 2. ИНТЕЛИГЕНТНА ВАЛИДАЦИЯ ЗА ТЕКСТА
  if (feedbackText.length > 0) {
    if (!isMeaningfulText(feedbackText)) {
      app.dialog.alert('Моля, въведете смислено изречение. Не използвайте произволни символи, повтарящи се букви и въведете поне две думи.', 'Невалиден текст');
      return; 
    }
  }
  
  // 3. ПРОВЕРКА ЗА ПЪЛНОТА
  var isComplete = true;
  if (!formData.mode || formData.improvements.length === 0 || feedbackText === "") {
    isComplete = false;
  }

  // Записваме резултатите
  if (isComplete) {
    completedSurveys.push(formData);
    app.toast.create({ text: 'Анкетата е изцяло попълнена!', closeTimeout: 2000, position: 'center' }).open();
  } else {
    partialSurveys.push(formData);
    app.toast.create({ text: 'Запазена частично (има празни полета).', closeTimeout: 2000, position: 'center' }).open();
  }

  // Изчистване на формата след успешен запис
  app.form.fillFromData('#survey-form', { mode: [], improvements: [], feedback: '' });
  fpsSlider.setValue(5);
});

// СЪБИТИЕ ЗА ОТВАРЯНЕ НА СТАТИСТИКАТА
$$('#stats-btn').on('click', function () {
  var allSurveys = completedSurveys.concat(partialSurveys);
  var lastEntry = allSurveys.length > 0 ? allSurveys[allSurveys.length - 1] : null;
  
  // Подготвяме данните за последния запис
  var preparedLastData = null;
  if (lastEntry) {
    preparedLastData = {
      mode: lastEntry.mode || 'Не е посочено',
      improvements: lastEntry.improvements && lastEntry.improvements.length > 0 ? lastEntry.improvements.join(', ') : 'Не е посочено',
      rating: lastEntry.rating || 5
    };
  }

  // Навигираме към страницата и подаваме контекста
  mainView.router.navigate('/stats/', {
    context: {
      allSurveys: allSurveys,
      completedCount: completedSurveys.length,
      partialCount: partialSurveys.length,
      totalSurveys: allSurveys.length,
      lastData: preparedLastData
    }
  });
});