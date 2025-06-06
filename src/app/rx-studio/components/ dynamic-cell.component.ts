import { Component, input, Input } from '@angular/core';

import {
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { TableField } from '../buildTableMatrix.factory';

@Component({
  standalone: true,
  selector: 'app-dynamic-cell',
  imports: [IonInput, IonSelect, IonSelectOption, FormsModule],
  template: `
@switch (field().type) {
  @case ('string') {
    <ion-input
      [(ngModel)]="row()[field.name]"
    ></ion-input>
  }
  @case ('number') {
    <ion-input
      type="number"
      [(ngModel)]="row()[field.name]"
    ></ion-input>
  }
  @case ('boolean') {
    <ion-select [(ngModel)]="row()[field.name]">
      <ion-select-option [value]="true">True</ion-select-option>
      <ion-select-option [value]="false">False</ion-select-option>
    </ion-select>
  }
}
`,
})
export class DynamicCellComponent {
  row = input<any>();
  field = input.required<TableField>();
}
