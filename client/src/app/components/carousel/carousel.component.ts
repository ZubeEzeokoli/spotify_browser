import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
	@Input() carouselId:string;
	@Input() resources:ResourceData[];

  constructor() { 
    this.carouselId = 'carousel_' + Date.now() + '_' + Math.floor(Math.random() * 1000);//generate a random carouselID, use Date.now() so there will be no duplicates
  }

  ngOnInit() {
  }

}
