class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display"); //seleciona o elemento
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate; // "_" diz que o atributo é privado
        this.initialize();
        this.initButtonsEvents();

    }

    initialize() { // inicializar, apenas uma função criada

        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

    }

    addEventListenerAll(element, events, fn) { //fn = função

        events.split(' ').forEach(event => { //split transforma os eventos em arra

            element.addEventListener(event, fn, false);

        });

    }

    clearAll() { //apagar tudo (botao AC)

        this._operation = [];

    }

    clearEntry() { // elimina o ultimo elemento

        this._operation.pop();

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        this._operation[this._operation.lenght - 1] = value;

    }

    isOperator(value) {

        return (['+', '-', '*', '%', '/'].indexOf(value) > -10);

    }

    addOperation(value) {

        console.log('A', isNaN(this.getLastOperation()));

        if (isNaN(this.getLastOperation())) {
            //string
            if (this.isOperator(value)) {
                //troca o operador
                this.setLastOperation(value);

            } else if (isNaN(value)) {

                //outra coisa
                console.log(value);

            } else {

                this._operation.push(value);

            }

        } else {
            //number
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(paserInt(newValue));
        }


        console.log(this._operation);

    }

    setError() {

        this.displayCalc = "Error";

    }

    execBtn(value) {

        switch (value) {

            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':

                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, "click drag", e => {
                //usando o btn.className.baseVal pra ele pegar apenas o nome da classe
                //usando o replace pra tirar o btn- e colocar nada no lugar
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouveup mousedown", e => {

                btn.style.cursor = "pointer";

            });

        })
    }

    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}