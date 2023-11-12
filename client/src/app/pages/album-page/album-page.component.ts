import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];


  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.albumId = this.route.snapshot.paramMap.get('id');
  	//TODO: inject spotifyService and use it to get the album data and the tracks for the album
    this.fetchAlbumData();
  }

  durationStr(duration:any) {
		var minutes:number = duration / 60000; //60 sec/min * 100ms/sec
		var seconds:number = (duration) / 1000 % 60; // 100ms/sec, get remainder
		return minutes.toFixed(0) + ':' + seconds.toFixed(0).padStart(2, '0');
	}
  
  fetchAlbumData() {
		this.spotifyService.getAlbum(this.albumId)
			.then((album: AlbumData) => {
				this.album = album;
        console.log(this.album);
			})
			.catch((error) => {
				console.error('Error fetching album data:', error);
			});

		this.spotifyService.getTracksForAlbum(this.albumId)
			.then((tracks: TrackData[]) => {
				this.tracks = tracks;
        console.log(this.tracks);
			})
			.catch((error) => {
				console.error('Error fetching tracks for artists:', error);
			});
	}

}
