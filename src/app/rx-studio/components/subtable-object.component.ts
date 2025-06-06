import { Component, computed, input, Input } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import {  } from '@ionic/angular/standalone';
import { TableField } from '../buildTableMatrix.factory';
import { DynamicCellComponent } from './ dynamic-cell.component';

@Component({
  standalone: true,
  selector: 'app-subtable-object',
  imports: [MatTableModule, DynamicCellComponent],
  template: `
  <table mat-table [dataSource]="[row()[field.name]]" class="sub-table">
    @for (sub of columens(); track sub) {
      <ng-container [matColumnDef]="sub.name">
        <th mat-header-cell *matHeaderCellDef>{{ sub.name }}</th>
        <td mat-cell *matCellDef="let subRow">
          <app-dynamic-cell [row]="subRow" [field]="sub"></app-dynamic-cell>
        </td>
      </ng-container>
    }
    <tr mat-header-row *matHeaderRowDef="displayedColumns()"></tr>
    <tr mat-row *matRowDef="let subRow; columns: displayedColumns()"></tr>
  </table>
  `,
})
export class SubtableObjectComponent {
    row = input<any>();
    field = input.required<TableField>();
    columens = computed(() => this.field().nestedFields);
    displayedColumns = computed(() => this.columens().map((col) => col.name));
}
