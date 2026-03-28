const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

const validButtons = ['+', '-', '*', '/', '(', ')', '.'];

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value) || validButtons.includes(value)) display.value += value;
    
    if (value === 'C') display.value = '';

    if (value === 'DEL') display.value = display.value.slice(0, -1);
    

    if (value === '=') {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Erro';
      }
    }
  });
});