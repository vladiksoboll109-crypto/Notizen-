const grid = document.getElementById('calendarGrid');
const modal = document.getElementById('noteModal');
const modalTitle = document.getElementById('modalDateTitle');
const modalInput = document.getElementById('modalTextInput');
const saveBtn = document.getElementById('saveModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const mainNotes = document.getElementById('mainNotes');

let currentActiveDay = null;

// Загрузка общих заметок месяца
mainNotes.value = localStorage.getItem('lavender_month_notes') || '';
mainNotes.addEventListener('input', (e) => {
  localStorage.setItem('lavender_month_notes', e.target.value);
});

// Отрисовка 30 дней месяца (с отступом в начале недели)
function buildCalendar() {
  grid.innerHTML = '';
  
  // Допустим, 1-е число выпадает на вторник (1 пустой слот)
  const emptyDays = 1;
  const totalDays = 30;

  for (let i = 0; i < emptyDays; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.style.opacity = '0';
    grid.appendChild(emptyCell);
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement('div');
    cell.className = 'day-cell';

    const savedText = localStorage.getItem(`day_note_${day}`) || '';
    if (savedText.trim().length > 0) {
      cell.classList.add('has-note');
    }

    cell.innerHTML = `
      <span class="day-num">${day}</span>
      <span class="cell-text-preview">${savedText}</span>
    `;

    cell.addEventListener('click', () => openModal(day));
    grid.appendChild(cell);
  }
}

// Открытие окна для ввода заметки
function openModal(day) {
  currentActiveDay = day;
  modalTitle.textContent = `${day} Сентября — Заметка`;
  modalInput.value = localStorage.getItem(`day_note_${day}`) || '';
  modal.classList.add('active');
  modalInput.focus();
}

// Закрытие окна
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Сохранение заметки в память браузера
saveBtn.addEventListener('click', () => {
  if (currentActiveDay) {
    const val = modalInput.value.trim();
    if (val) {
      localStorage.setItem(`day_note_${currentActiveDay}`, val);
    } else {
      localStorage.removeItem(`day_note_${currentActiveDay}`);
    }
    buildCalendar();
  }
  modal.classList.remove('active');
});

// Закрытие по клику вне окна
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

buildCalendar();
