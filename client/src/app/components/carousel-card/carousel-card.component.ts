import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css']
})
export class CarouselCardComponent implements OnInit {
  @Input() resource:ResourceData;

  constructor() { }

  ngOnInit() {
  }
  
  get resourceURL(): string {
    if (this.resource.category === 'artist') {
      // console.log(`https://open.spotify.com/artist/${this.resource.id}`)
      return `/artist/${this.resource.id}`;
    } else if (this.resource.category === 'album') {
      return `/album/${this.resource.id}`;
    } else if (this.resource.category === 'track') {
      return `/track/${this.resource.id}`;
    } else {
      return '/'; // Default URL
    }
  }
}
