import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.css']
})
export class LocalisationComponent implements OnInit {

  constructor() { }
  latitude = 48.9333;
  longitude = 2.05;
  locationChosen = false;
  title: 'SmartMapper';

  ngOnInit(): void {
  }

}
