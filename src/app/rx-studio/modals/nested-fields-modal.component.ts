import { Component, inject, input } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonFooter,
  IonModal,
  ModalController,
} from '@ionic/angular/standalone';
import { TableField } from '../buildTableMatrix.factory';

@Component({
  standalone: true,
  selector: 'app-nested-fields-modal',
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonFooter,
  ],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Nested Fields</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">✖</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form [formGroup]="form">
        @for (field of $any(nestedFields); track field) {
        <ion-item>
          <ion-label>{{ field.name }}</ion-label>
          @if (field.type === 'string' || field.type === 'number') {
          <ion-input
            [type]="field.type === 'number' ? 'number' : 'text'"
            [formControlName]="field.name"
            [value]="$any(data)[field.name]"
          ></ion-input>
          }
        </ion-item>
        }
      </form>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" (click)="save()">Save</ion-button>
      </ion-toolbar>
    </ion-footer>
  `,
})
export class NestedFieldsModalComponent {
  modalCtrl = inject(ModalController);
  formBuilder = inject(FormBuilder);

  nestedFields = input.required<TableField[]>();
  data = input.required<any>();

  form: FormGroup = this.formBuilder.group({});

  ngOnInit() {
    console.log(new Object(this.data as any));

    const controls: any = {};
    (this.nestedFields as any).forEach((field: any) => {
      console.log(field);

      controls[field.name] = [(this.data as any)[field.name] || field.default || ''];
    });
    this.form = this.formBuilder.group(controls);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    this.modalCtrl.dismiss(this.form.value);
  }
}
