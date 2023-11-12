import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  tracks:ResourceData[];
  hideArtist: boolean = false;
  hideAlbum: boolean = false;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    console.log(this.searchString);
    console.log(this.searchCategory);
  
    if (this.searchCategory === 'track') {
      this.spotifyService.searchFor(this.searchCategory, this.searchString)
        .then((results) => {
          this.tracks = results;
          this.resources = [];
          console.log(this.tracks);
          if (this.tracks.length > 0) {
            console.log(this.tracks[0]); // Output the first search result (for example)
          } else {
            console.log('No search results found');
          }
        })
        .catch((error) => {
          console.error('Error occurred during the search:', error);
        });
    } else {
      this.spotifyService.searchFor(this.searchCategory, this.searchString)
        .then((results) => {
          this.resources = results;
          this.tracks = [];
          console.log(this.resources);
          if (this.resources.length > 0) {
            console.log(this.resources[0]); // Output the first search result (for example)
          } else {
            console.log('No search results found');
          }
        })
        .catch((error) => {
          console.error('Error occurred during the search:', error);
        });
    }
  }

  toggleHideArtist() {
    this.hideArtist = !this.hideArtist;
  }
  
  toggleHideAlbum() {
    this.hideAlbum = !this.hideAlbum;
  }
  }
