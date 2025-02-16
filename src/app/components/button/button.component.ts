import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-button',
  standalone: false,
  
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() btnLabel: string = '';
  @Input() btnType: string = '';
  @Output() clickEvent = new EventEmitter<string>();

  constructor(private calService: CalculatorService) {

  }

  btnClick() {
    if(this.btnType === 'number' && this.calService.equation.includes('=')) {
      this.calService.reset();
    }
    // this.calService.equation = this.calService.equation + this.btnLabel + ' '
    if(this.btnType === 'number') {
      console.log('number')
      // this.calService.equation = this.calService.equation + this.btnLabel;
      if(this.calService.isDecimal) {
        this.calService.rightNumber = Number(this.calService.rightNumber + '.' + this.btnLabel)
        this.calService.isDecimal = false;
      } else {
        this.calService.rightNumber = Number(this.calService.rightNumber + this.btnLabel);
      } 
      this.calService.result = this.calService.rightNumber
    } else if (this.btnType === 'operator') {
      if(this.btnLabel !== '=') {
        this.calService.operator = this.btnLabel;
        this.calService.leftNumber = this.calService.rightNumber ? this.calService.rightNumber : this.calService.leftNumber;
        this.calService.rightNumber = 0; 
        if(this.calService.equation.includes('=')) {
          this.calService.equation = this.calService.result + ' ' + this.btnLabel + ' ';
          this.calService.leftNumber = this.calService.result;
        } else {
          this.calService.equation = this.calService.leftNumber + ' ' + this.btnLabel + ' ';
        }
      } else {
        if(this.calService.operator === '') {
          this.calService.equation = this.calService.rightNumber + ' =';
        } else {
          this.calService.equation =  this.calService.leftNumber + ' ' + this.calService.operator + ' ' + this.calService.rightNumber + ' = ';
          if(this.calService.result === this.calService.leftNumber && this.calService.rightNumber === 0)
          {
            this.calService.rightNumber = this.calService.result;
            this.calService.equation = this.calService.leftNumber + ' ' + this.calService.operator + ' ' + this.calService.rightNumber + ' = ';
          }
          this.calService.computeResult();
        }
      }
    } else if(this.btnType === 'reset') {
      this.calService.reset();
    } else if(this.btnType === 'decimal') {
      this.calService.isDecimal = this.calService.isDecimal ? false : String(this.calService.result).includes('.') ? false : true;
    } else if(this.btnType === 'sign') {
      this.calService.rightNumber *= -1;
      this.calService.result = this.calService.rightNumber;
    } else if (this.btnType === 'delete') {
      const numString = String(this.calService.rightNumber);
      this.calService.rightNumber = Number(numString.substring(0, numString.length - 1));
      this.calService.result = this.calService.rightNumber;
    } else if(this.btnType === 'specialOp') {
      if(this.btnLabel === '√×') {
        this.calService.equation = this.calService.equation ? `${this.calService.leftNumber} ${this.calService.operator} √(${this.calService.rightNumber})` : `√(${this.calService.rightNumber})`;
        this.calService.rightNumber = Math.sqrt(this.calService.rightNumber);
      } else if(this.btnLabel === '×²') {
        this.calService.equation = this.calService.equation ? `${this.calService.leftNumber} ${this.calService.operator} sqr(${this.calService.rightNumber})` : `sqr(${this.calService.rightNumber})`;
        this.calService.rightNumber *= this.calService.rightNumber;
      } else if(this.btnLabel === '%') {
        this.calService.rightNumber = (this.calService.leftNumber / 100) * this.calService.rightNumber;
        this.calService.equation = this.calService.equation ? `${this.calService.leftNumber} ${this.calService.operator} ${this.calService.rightNumber} =`: '';
      } else if(this.btnLabel === 'CE') {
        this.calService.rightNumber = 0;
      }
      this.calService.result = this.calService.rightNumber;
    }

    this.clickEvent.emit('');
    console.log('--------------------------------------');
    console.log('operator: ' + this.calService.operator);
    console.log('equation: ' + this.calService.equation);
    console.log('leftNumber: ' + this.calService.leftNumber);
    console.log('rightNumber: ' + this.calService.rightNumber);
  }
}
