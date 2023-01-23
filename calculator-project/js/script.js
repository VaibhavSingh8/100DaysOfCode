class Calculator{
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.allClear();
    }

    allClear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = '';
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() + number.toString() ;
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.solve();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand ;
        this.currentOperand = '' ;
    }

    solve(){
        let result ;
        const prev = parseInt(this.previousOperand);
        const current = parseInt(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                result = prev + current ;
                break;

            case '-':
                result = prev - current ;
                break;

            case '*':
                result = prev * current  ;
                break;

            case '÷':
                result = prev / current ;
                break;
            
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = '';
        this.previousOperand = '';
    }

    updateDisplay(){
        this.currentOperandElement.innerHTML = this.currentOperand;
        if(this.operation !== null){
            this.previousOperandElement.innerHTML = `${this.previousOperand} ${this.operation} `;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator( previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.solve();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.allClear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});