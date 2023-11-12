import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ThermometerComponent } from '../../components/thermometer/thermometer.component'; // Import the ThermometerComponent


@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');
  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
    this.fetchTrackData();
  }

  durationStr(duration:any) {
		var minutes:number = duration / 60000; //60 sec/min * 100ms/sec
		var seconds:number = (duration) / 1000 % 60; // 100ms/sec, get remainder
		return minutes.toFixed(0) + ':' + seconds.toFixed(0).padStart(2, '0');
	}
  percentage(percent:any) {
		return (percent * 100).toFixed(0);
	}

  fetchTrackData() {
		this.spotifyService.getTrack(this.trackId)
			.then((track: TrackData) => {
				this.track = track;
        console.log(this.track);
			})
			.catch((error) => {
				console.error('Error fetching track data:', error);
			});

		this.spotifyService.getAudioFeaturesForTrack(this.trackId)
			.then((audioFeatures: TrackFeature[]) => {
				this.audioFeatures = audioFeatures;
        console.log(this.audioFeatures);
			})
			.catch((error) => {
				console.error('Error fetching audio feature for artists:', error);
			});
	}
}
