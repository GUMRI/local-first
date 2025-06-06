import { Component, computed, inject, input, Input } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { DynamicCellComponent } from './ dynamic-cell.component';
import { SubtableObjectComponent } from './subtable-object.component';
import { SubtableArrayComponent } from './ subtable-array.component';
import { DatabaseService } from '../../local-first/services/db.service';
import { TableCollection } from '../buildTableMatrix.factory';
import { rxResource } from '@angular/core/rxjs-interop';
import { TCollections } from '../../local-first/RxDB';

@Component({
  standalone: true,
  selector: 'app-dynamic-table',
  imports: [
    MatTableModule,
    DynamicCellComponent,
    SubtableObjectComponent,
    SubtableArrayComponent
],
  template: `
    <table mat-table [dataSource]="data.value()" class="main-table">
      @for (col of columns(); track col) {
        <ng-container [matColumnDef]="col.name">
          <th mat-header-cell *matHeaderCellDef>{{ col.name }}</th>
          <td mat-cell *matCellDef="let row">
            @switch (col.type) {
              @case ('string') {
                <app-dynamic-cell
                  [field]="col"
                  [row]="row"
                ></app-dynamic-cell>
              }
              @case ('number') {
                <app-dynamic-cell
                  [field]="col"
                  [row]="row"
                ></app-dynamic-cell>
              }
              @case ('boolean') {
                <app-dynamic-cell
                  [field]="col"
                  [row]="row"
                ></app-dynamic-cell>
              }
              @case ('object') {
                <app-subtable-object
                  [field]="col"
                  [row]="row"
                ></app-subtable-object>
              }
              @case ('array') {
                <app-subtable-array
                  [field]="col"
                  [row]="row"
                ></app-subtable-array>
              }
            }
          </td>
        </ng-container>
      }
    
      <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns()"></tr>
    </table>
    `,
})
export class DynamicTableComponent {
  dbs = inject(DatabaseService);
  readonly collection = input.required<TableCollection>();

  columns = computed(() => this.collection().fields);
  displayedColumns = computed(() => this.columns().map((col) => col.name));

  data = rxResource({
    loader: () =>
      this.dbs.getCollection(this.getkey(this.collection().name)).find().$,
    defaultValue: [],
  });

  getkey(prop: any): keyof TCollections {
    return prop as keyof TCollections;
  }
}
