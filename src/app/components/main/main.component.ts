import { Component } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-main',
  standalone: false,
  
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private calService: CalculatorService) {}
  rightNumber: number = 0;
  result: number = 0;
  equation: string = '';
  isDecimal: boolean = false;

  click(event: string) {
    this.result = this.calService.result;
    this.equation = this.calService.equation;
    this.rightNumber = this.calService.rightNumber;
    this.isDecimal = this.calService.isDecimal;
  }
}
