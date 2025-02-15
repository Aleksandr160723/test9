// Данные о требованиях к уровням
const LEVEL_REQUIREMENTS = {
    2: 72,
    3: 100,
    4: 138,
    5: 180,
    6: 240,
    7: 317,
    8: 415,
    9: 540,
    10: 700,
    11: 900,
    12: 1152,
    13: 1470,
    14: 1900
};

// Игровые переменные
let balance = 0;
let level = 1;
let clickValue = 1;

// Функция проверки возможности повышения уровня
function checkLevelUpAvailability() {
    const nextLevel = level + 1;
    const requiredAmount = LEVEL_REQUIREMENTS[nextLevel];
    
    if (!requiredAmount) return; // Если нет следующего уровня
    
    const levelUpButton = document.getElementById('levelUpButton');
    if (balance >= requiredAmount) {
        levelUpButton.textContent = `Поднять уровень (${requiredAmount}$)`;
        levelUpButton.classList.remove('hidden');
        levelUpButton.classList.add('visible');
    } else {
        levelUpButton.classList.remove('visible');
        levelUpButton.classList.add('hidden');
    }
}

// Обработчик клика по кнопке повышения уровня
document.getElementById('levelUpButton').addEventListener('click', () => {
    const nextLevel = level + 1;
    const requiredAmount = LEVEL_REQUIREMENTS[nextLevel];
    
    if (balance >= requiredAmount) {
        balance -= requiredAmount;
        level++;
        clickValue *= 1.2;
        updateUI();
        checkLevelUpAvailability();
    }
});

// Обработчик клика по игровой области
document.getElementById('clickArea').addEventListener('click', (e) => {
    // Добавляем анимацию денег
    const clickArea = e.currentTarget;
    const moneySymbol = document.createElement('div');
    moneySymbol.className = 'money-symbol';
    moneySymbol.textContent = '$';
    const rect = clickArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    moneySymbol.style.left = x + 'px';
    moneySymbol.style.top = y + 'px';
    clickArea.appendChild(moneySymbol);
    
    // Начисляем деньги и обновляем интерфейс
    balance += clickValue;
    updateUI();
    checkLevelUpAvailability();
    
    // Удаляем анимацию через 500мс
    setTimeout(() => {
        moneySymbol.remove();
    }, 500);
});

// Функция обновления интерфейса
function updateUI() {
    document.getElementById('balance').textContent = balance.toFixed(2);
    document.getElementById('level').textContent = level;
    document.getElementById('clickValue').textContent = clickValue.toFixed(2);
}

// Управление страницами
const pages = {
    main: document.querySelector('.main-page'),
    white: document.getElementById('whitePage'),
    buy: document.getElementById('buyPage'),
    my: document.getElementById('myPage')
};

// Навигация: кнопка "+" (только для белой страницы)
document.getElementById('addBtn').addEventListener('click', () => {
    pages.main.style.display = 'none';
    pages.white.style.display = 'block';
    pages.buy.style.display = 'none';
    pages.my.style.display = 'none';
});

// Навигация: кнопка "←" (возврат на главную)
document.getElementById('backBtn').addEventListener('click', () => {
    pages.white.style.display = 'none';
    pages.buy.style.display = 'none';
    pages.my.style.display = 'none';
    pages.main.style.display = 'block';
});

// Кнопка "Купить предприятие"
document.getElementById('buyBtn').addEventListener('click', () => {
    pages.white.style.display = 'none';
    pages.buy.style.display = 'block';
});

// Кнопка "Мои предприятия"
document.getElementById('myBtn').addEventListener('click', () => {
    pages.white.style.display = 'none';
    pages.my.style.display = 'block';
});


// Предотвращение прокрутки на мобильных устройствах
document.body.addEventListener('touchmove', function(e) {
    if (e.target.classList.contains('click-area')) {
        e.preventDefault();
    }
}, { passive: false });

// Расширяем объект pages новыми страницами
pages.gasStation = document.getElementById('gasStationPage');
pages.business = document.getElementById('businessPage');
pages.company = document.getElementById('companyPage');

// Обработчики кликов для новых кнопок
document.getElementById('gasStationBtn').addEventListener('click', () => {
    pages.buy.style.display = 'none';
    pages.gasStation.style.display = 'block';
});

document.getElementById('businessBtn').addEventListener('click', () => {
    pages.buy.style.display = 'none';
    pages.business.style.display = 'block';
});

document.getElementById('companyBtn').addEventListener('click', () => {
    pages.buy.style.display = 'none';
    pages.company.style.display = 'block';
});

// Обработчики событий для кнопок навигации
document.getElementById('addBtn').addEventListener('click', () => {
    // Сначала скрываем все страницы
    Object.values(pages).forEach(page => {
        page.style.display = 'none';
    });
    
    // Затем показываем нужную страницу
    pages.white.style.display = 'block';
});

document.getElementById('backBtn').addEventListener('click', () => {
    // Сначала скрываем все страницы
    Object.values(pages).forEach(page => {
        page.style.display = 'none';
    });
    
    // Затем показываем главную страницу
    pages.main.style.display = 'block';
}); 

  document.getElementById('clickArea').addEventListener('click', (e) => {
    const clickArea = e.currentTarget;
    
    // Удаляем предыдущие элементы анимации
    const existingGlows = clickArea.querySelectorAll('.glow-effect');
    existingGlows.forEach(glow => glow.remove());
    
    // Создаем новые элементы анимации
    const sides = ['top', 'bottom', 'left', 'right'];
    sides.forEach(side => {
      const glow = document.createElement('div');
      glow.className = `glow-effect glow-${side}`;
      clickArea.appendChild(glow);
    });
  
  });
  
// Инициализация
updateUI();
