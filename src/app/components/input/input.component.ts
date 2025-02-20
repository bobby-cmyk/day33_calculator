import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CalInput } from '../../models';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  
  @Output()
  whenInput = new Subject<CalInput>

  @Output()
  evaluateEqnEvent = new Subject<string>

  protected insertInput(type:string, value:string) {
    let input:CalInput = {
      type: type,
      value: value
    }

    console.info(input)

    this.whenInput.next(input)
  }

  protected evaluateEqn() {
    this.evaluateEqnEvent.next('')
  }
}
