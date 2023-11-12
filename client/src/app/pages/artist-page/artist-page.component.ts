import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];
  currentSlide:any;
  @Input() albumCarouselId:string;
  @Input() relatedCarouselId:string;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { 
    this.albumCarouselId = 'albumCarousel_' + Date.now() + '_' + Math.floor(Math.random() * 1000);//generate a random carouselID, use Date.now() so there will be no duplicates
    this.relatedCarouselId = 'relatedCarousel_' + Date.now() + '_' + Math.floor(Math.random() * 1000);//generate a random carouselID, use Date.now() so there will be no duplicates

  } //inject spotifyService

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.fetchArtistData();
  }

  durationStr(duration:any) {
		var minutes:number = duration / 60000; //60 sec/min * 100ms/sec
		var seconds:number = (duration) / 1000 % 60; // 100ms/sec, get remainder
		return minutes.toFixed(0) + ':' + seconds.toFixed(0).padStart(2, '0');
	}
  fetchArtistData() {
		this.spotifyService.getArtist(this.artistId)
			.then((artist: ArtistData) => {
				this.artist = artist;
        console.log(this.artist);
			})
			.catch((error) => {
				console.error('Error fetching artist data:', error);
			});

		this.spotifyService.getRelatedArtists(this.artistId)
			.then((relatedArtists: ArtistData[]) => {
				this.relatedArtists = relatedArtists;
        console.log(this.relatedArtists);
			})
			.catch((error) => {
				console.error('Error fetching related artists:', error);
			});

		this.spotifyService.getTopTracksForArtist(this.artistId)
			.then((topTracks: TrackData[]) => {
				this.topTracks = topTracks;
        console.log(this.topTracks["tracks"][0]["album"].id);
			})
			.catch((error) => {
				console.error('Error fetching top tracks:', error);
			});

		this.spotifyService.getAlbumsForArtist(this.artistId)
			.then((albums: AlbumData[]) => {
				this.albums = albums;
        console.log(this.albums);
			})
			.catch((error) => {
				console.error('Error fetching albums:', error);
			});
	}
}