class Calculator {
  constructor() {
    this.display = document.querySelector('.display');
    this.buttons = document.querySelectorAll('button');
    this.validOperators = ['+', '-', '*', '/', '(', ')', '.'];
    this.init();
  }

  init() {
    this.handleButtons();
    this.handleKeyboard();
  }

  handleButtons() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.textContent;

        if (this.isValidInput(value)) {
          this.addToDisplay(value);
          return;
        }

        if (value === 'C') {
          this.clearDisplay();
          return;
        }

        if (value === 'DEL') {
          this.deleteOne();
          return;
        }

        if (value === '=') {
          this.calculate();
        }
      });
    });
  }

  handleKeyboard() {
    document.addEventListener('keydown', (event) => {
      const key = event.key;

      if (this.isValidInput(key)) {
        this.addToDisplay(key);
        return;
      }

      if (key === 'Enter') {
        event.preventDefault();
        this.calculate();
      }

      if (key === 'Backspace') {
        this.deleteOne();
      }

      if (key === 'Escape') {
        this.clearDisplay();
      }
    });
  }

  isValidInput(value) {
    return !isNaN(value) || this.validOperators.includes(value);
  }

  addToDisplay(value) {
    if (this.display.value === 'Erro') {
      this.display.value = '';
    }

    const lastChar = this.display.value.slice(-1);
    const operators = ['+', '-', '*', '/'];

    if (operators.includes(lastChar) && operators.includes(value)) {
      return;
    }

    this.display.value += value;
  }

  clearDisplay() {
    this.display.value = '';
  }

  deleteOne() {
    if (this.display.value === 'Erro') {
      this.clearDisplay();
      return;
    }

    this.display.value = this.display.value.slice(0, -1);
  }

  calculate() {
    try {
      const expression = this.display.value;

      if (!expression) return;

      const result = eval(expression);

      if (
        result === undefined ||
        result === null ||
        Number.isNaN(result) ||
        !Number.isFinite(result)
      ) {
        this.display.value = 'Erro';
        return;
      }

      this.display.value = result;
    } catch {
      this.display.value = 'Erro';
    }
  }
}

new Calculator();