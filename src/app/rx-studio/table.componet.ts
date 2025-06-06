import {
  Component,
  computed,
  OnInit,
  input,
  inject,
  effect,
  ViewChild,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TableCollection, TableField } from './buildTableMatrix.factory';
import { DatabaseService } from '../local-first/services/db.service';
import { TCollections } from '../local-first/RxDB';
import { rxResource } from '@angular/core/rxjs-interop';
import { OverlayEventDetail } from '@ionic/core/components';
import {
  IonToggle,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { NestedFieldsModalComponent } from './modals/nested-fields-modal.component';

@Component({
  selector: 'app-collection-table',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    IonToggle,
    IonButton,
    JsonPipe,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar,
  ],
  template: `
    <table mat-table [dataSource]="data.value()" class="mat-elevation-z8">
      @for (col of columns(); track col) {
      <ng-container [matColumnDef]="col.name">
        <th mat-header-cell *matHeaderCellDef>{{ col.name }}</th>
        <td mat-cell *matCellDef="let row">
          @switch (col.type) { @case ('string') {
          <ion-input
            [value]="row[col.name]"
            [placeholder]="col.name"
            type="text"
          ></ion-input>
          } @case ('number') {
          <ion-input
            [value]="row[col.name]"
            [placeholder]="col.name"
            type="number"
          ></ion-input>
          } @case ('boolean') {
          <ion-toggle [value]="row[col.name]"></ion-toggle>
          } @case ('object') {
          <ion-button (click)="openNestedModal(col.nestedFields, row[col.name])"> open {{ col.name }} </ion-button>
          } @default {
          {{ row[col.name] | json }}
          } }
        </td>
      </ng-container>
      }

      <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
        margin-bottom: 16px;
      }
      h2 {
        margin: 16px 0 8px;
      }
    `,
  ],
})
export class CollectionTableComponent implements OnInit {
  dbs = inject(DatabaseService);
  readonly collection = input.required<TableCollection>();

  columns = computed(() => this.collection().fields);
  displayedColumns = computed(() => this.columns().map((col) => col.name));

  data = rxResource({
    loader: () =>
      this.dbs.getCollection(this.getkey(this.collection().name)).find().$,
    defaultValue: [],
  });
  
  ngOnInit() {}
  getkey(prop: any): keyof TCollections {
    return prop as keyof TCollections;
  }
  modalCtrl = inject(ModalController);

  async openNestedModal(nestedFields: TableField[], nestedData: any) {
    const modal = await this.modalCtrl.create({
      component: NestedFieldsModalComponent,
      componentProps: {
        nestedFields,
        data: nestedData,
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Form Result:', data);
    }
  }
}
