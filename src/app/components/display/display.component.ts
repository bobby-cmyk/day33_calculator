import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit, OnChanges{
  
  @Input()
  displayEqn!:string

  @Input()
  pastEqn!:string

  @Input()
  calculatedValue!:number

  evaluatedEqn:boolean = false

  ngOnInit(): void {
    this.evaluatedEqn = false
  }

  ngOnChanges(changes : SimpleChanges) {
    if (changes['calculatedValue']) {
      this.evaluatedEqn = true
    }
    else {
      this.evaluatedEqn = false
    }
  }

  
}
