import {Component, Input, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = 'Registrati per visualizzare il contenuto che vuoi';

  constructor() { }

  ngOnInit(): void {
  }

}
