class Calculator {
  constructor() {
    this.display = document.querySelector('.display');
    this.buttons = document.querySelectorAll('button');
    this.themeToggle = document.querySelector('.theme-toggle');
    this.validOperators = ['+', '-', '*', '/', '(', ')', '.'];
    this.init();
  }

  init() {
    this.handleButtons();
    this.handleKeyboard();
    this.loadTheme();
    this.handleThemeToggle();
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

  handleThemeToggle() {
  this.themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');

    const icon = this.themeToggle.querySelector('i');

    if (document.body.classList.contains('light')) {
      icon.classList.remove('bi-moon');
      icon.classList.add('bi-sun');
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.remove('bi-sun');
      icon.classList.add('bi-moon');
      localStorage.setItem('theme', 'dark');
    }
  });
}

  loadTheme(){
    const savedTheme = localStorage.getItem('theme');
    const icon = this.themeToggle.querySelector('i');

    if(savedTheme === 'light'){
      document.body.classList.add('light');
      icon.classList.remove('bi-moon');
      icon.classList.add('bi-sun');
    }
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