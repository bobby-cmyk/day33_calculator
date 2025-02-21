import { Component } from '@angular/core';
import { CalInput } from './models';
import { last } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  calculatedValue: number = 0

  pastEqn: string = '0'

  displayEqn: string = "0"
  
  currentEqn:CalInput[] = [{type:"number", value:'0'}]

  justEvaluated:boolean = false

  subtotal:number = 0

  showErrorDialog: boolean = false;

  protected allClear($event:string) {
    this.pastEqn = '0'
    this.displayEqn = '0'
    this.currentEqn = [{type:"number", value:'0'}]
    this.subtotal = 0
    this.justEvaluated = false
    // Avoid resetting calValue to avoid triggering changes for evaluatedEqn()
  }
  
  protected evaluateEqn($event:string) {
    try {
      this.calculatedValue = eval(this.displayEqn)
      this.subtotal = this.calculatedValue
      this.justEvaluated = true;

      console.info(this.calculatedValue)
      this.currentEqn = [{type:"number", value:'0'}]
      this.pastEqn = this.displayEqn
      this.displayEqn = "0"
    }
    catch (e) {
      alert('Equation cannot be evaluted!');
    }
  }

  protected pushToCurrentEqn($event:CalInput) {

    if (this.justEvaluated==false) {
      if (this.currentEqn.length == 1) {
        if (this.currentEqn[0].value == '0') {
          if ($event.type=='number') {
            this.currentEqn = [...this.currentEqn];
            this.currentEqn[0] = $event;
          }
          else {
            this.currentEqn = [...this.currentEqn, $event]
          }
        }
        else {
          this.currentEqn = [...this.currentEqn, $event]
        }
      }
      else {
        let lastInput = this.currentEqn[this.currentEqn.length - 1]
  
        if (lastInput.type=='number' && $event.type=='number') {
          this.currentEqn = [...this.currentEqn]
  
          let combinedItem: CalInput = {
            type : 'number',
            value : lastInput.value + $event.value
          }
  
          this.currentEqn[this.currentEqn.length - 1] = combinedItem
        }
  
        else if ((lastInput.type=='ops' && $event.type=='ops')) {
  
          if ((lastInput.value == '*' && $event.value == '-') 
            || (lastInput.value == '/' && $event.value == '-')){
              this.currentEqn = [...this.currentEqn, $event]
          }
        }  
        else {
          this.currentEqn = [...this.currentEqn, $event]
        }
      }
    }
    else {
      if ($event.type=='ops') {
        this.currentEqn[0] = {type:'number', value: this.subtotal.toString()};
        this.currentEqn = [...this.currentEqn, $event];
        this.justEvaluated = false;
      }
      else {
        this.pastEqn = '0'
        this.displayEqn = '0'
        this.subtotal = 0
        this.justEvaluated = false;
        this.currentEqn = [...this.currentEqn];
        this.currentEqn[0] = $event;
      }
    }

    console.log('>>> currentEquation', this.currentEqn)
    
    this.displayEqn = this.currentEqn.reduce((acc, item) => acc + item.value, '');
  }

}