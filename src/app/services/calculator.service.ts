import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  leftNumber: number = 0;
  rightNumber: number = 0;
  result: number = 0;
  operator: string = '';
  equation: string = '';
  isDecimal: boolean = false;

  constructor() { }

  computeResult() {
    switch (this.operator) {
      case '+':
        this.result = this.leftNumber + this.rightNumber;
        break;
      case '-':
        this.result = this.leftNumber - this.rightNumber;
        break;
      case '×':
        this.result = this.leftNumber * this.rightNumber;
        break;
      case '÷':
        this.result = this.leftNumber / this.rightNumber;
        break;
    
      default:
        break;
    }

    this.leftNumber = this.result;
    // this.equation = this.equation + this.result;
  }

  reset() {
    this.leftNumber = 0;
    this.rightNumber = 0;
    this.equation = '';
    this.operator = '';
    this.result = 0;
    this.isDecimal = false;
  }


}
