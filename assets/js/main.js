const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

const validButtons = ['+', '-', '*', '/', '(', ')', '.'];

function addToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteOne() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Erro';
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value) || validButtons.includes(value)) {
      addToDisplay(value);
    }

    if (value === 'C') {
      clearDisplay();
    }

    if (value === 'DEL') {
      deleteOne();
    }

    if (value === '=') {
      calculate();
    }
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || validButtons.includes(key)) {
    addToDisplay(key);
  }

  if (key === 'Enter') {
    calculate();
  }

  if (key === 'Backspace') {
    deleteOne();
  }

  if (key === 'Escape') {
    clearDisplay();
  }
});