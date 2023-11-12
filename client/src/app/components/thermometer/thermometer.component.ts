import { Component, Input, OnInit } from '@angular/core';
import * as chroma from 'chroma.ts';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() featureColor: string; // Color to represent the audio feature
  @Input() featureName: string; 
  @Input() featurePercentage: number = 0; // Percentage of the audio feature

  constructor() { }

  ngOnInit() {

  }

}
