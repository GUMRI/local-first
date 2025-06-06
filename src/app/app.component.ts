import { Component, computed, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from './local-first/services/db.service';

import { buildTableMatrix } from './rx-studio/buildTableMatrix.factory';
import { IonLabel, 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/angular/standalone';

  import { MatTableModule } from '@angular/material/table';
import { CollectionTableComponent } from './rx-studio/table.componet';
import { TCollections } from './local-first/RxDB';
import { DynamicTableComponent } from './rx-studio/components/dynamic-table.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IonLabel,
    IonContent, IonHeader, IonTitle, IonToolbar, CollectionTableComponent, DynamicTableComponent,
    IonSegment, IonSegmentButton, IonSegmentContent, MatTableModule, IonSegmentView],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myapp';
dbs = inject(DatabaseService)
collections  = buildTableMatrix(this.dbs.db).collections



  constructor() {
  
 
    
  }
  ngOnInit() {
      

  }

  
}
