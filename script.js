const actionButtons = document.querySelectorAll('button[data-action]');
const currentValueElement = document.querySelector('.output > .current');
const prevValueElement = document.querySelector('.output > .previous');

class Calculator {
    operationMap = new Map([
        ['add', '+'],
        ['subtract', '-'],
        ['multiply', '*'],
        ['divide', '/']
    ])

    constructor(prevElementText, curElementText) {
        this.prevElementText = prevElementText;
        this.curElementText = curElementText;
        this.operation = null;
        this.clear();
    }

    get currentText() {
        return this.curElementText.textContent;
    }

    get prevText() {
        return this.prevElementText.textContent;
    }

    setOperation(action) {
        this.operation = action;
    }

    updatePrevValue() {
        this.prevElementText.innerHTML = this.currentText + ' ' + this.operationMap.get(this.operation);
    }

    updateDisplay(value) {
        if (!this.operation) {
            this.prevElementText.innerHTML = '';
        }

        this.curElementText.innerHTML = value;
    }

    clear() {
        this.curElementText.innerHTML = '0';
        this.prevElementText.innerHTML = '';
        this.setOperation(null);
    }

    delete() {
        this.curElementText.innerHTML = this.currentText.length === 1 ? '0' : this.currentText.slice(0, -1);
    }

    calculate() {
        let computed;
        const prev = parseFloat(this.prevText);
        const cur = parseFloat(this.currentText);

        if (isNaN(prev) || isNaN(cur)) {
            return;
        }

        switch (this.operation) {
            case 'add':
                computed = prev + cur;
                break;
            case 'subtract':
                computed = prev - cur;
                break;
            case 'multiply':
                computed = prev * cur;
                break;
            case 'divide':
                computed = prv / cur;
                break;
        }

        this.setOperation(null);
        this.updateDisplay(computed.toString());
    }
}

const calc = new Calculator(prevValueElement, currentValueElement);

const clickHandler = (event) => {
    const action = event.target.dataset.action;

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        calc.setOperation(action)
        calc.updatePrevValue();
        calc.updateDisplay('0');
    }

    if (action === 'decimal') {
        !calc.currentText.includes('.') && calc.updateDisplay(calc.currentText + '.');
    }

    if (action === 'number') {
        if (calc.currentText === '0') {
            calc.updateDisplay(event.target.textContent);
        } else {
            calc.updateDisplay(calc.currentText + event.target.textContent)
        }
    }

    if (action === 'calculate') {
        calc.calculate();
    }

    if (action === 'delete') {
        calc.delete();
    }

    if (action === 'clear') {
        calc.clear();
    }

}

actionButtons.forEach(button => {
    button.addEventListener('click', clickHandler)
});