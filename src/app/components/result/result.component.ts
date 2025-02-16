import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: false,
  
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent {
  @Input() result: number = 0;
  @Input() rightNumber: number = 0;
  @Input() equation: string = '';
  @Input() isDecimal: boolean = false;
}
