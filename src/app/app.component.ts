import { Component, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from './local-first/services/db.service';
import { collectionFactory } from './local-first/services/collectionFactory'

import { IUser } from './core/user.model';
import { IQuery } from './local-first/types/collection.models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myapp';


  constructor() {
    
  }
  ngOnInit() {
    


  }
}
