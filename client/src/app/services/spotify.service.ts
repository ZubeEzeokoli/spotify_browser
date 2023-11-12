import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    const url = `${this.expressBaseUrl}${endpoint}`;
    return lastValueFrom(this.http.get(url));
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    const encodedResource = encodeURIComponent(resource);
    const endpoint = `/search/${category}/${encodedResource}`;

    return this.sendRequestToExpress(endpoint).then((data: any) => {
      let results: ResourceData[] = [];

      if (category === 'artist') {
        results = data.artists.items.map((artist: any) => new ArtistData(artist));
      } else if (category === 'album') {
        results = data.albums.items.map((album: any) => new AlbumData(album));
      } else if (category === 'track') {
        results = data.tracks.items.map((track: any) => new TrackData(track));
      }

      return results;
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    const encodedArtistId = encodeURIComponent(artistId);
    const endpoint = `/artist/${encodedArtistId}`; // Define the endpoint in your Express server for fetching an artist

    return lastValueFrom(this.http.get<ArtistData>(`${this.expressBaseUrl}${endpoint}`));
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    // const encodedArtistId = encodeURIComponent(artistId);
    const endpoint = `/artist-related-artists/${artistId}`; // Spotify API endpoint for related artists

    return lastValueFrom(this.http.get<ArtistData[]>(`${this.expressBaseUrl}${endpoint}`));
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    const endpoint = `/artist-top-tracks/${artistId}`; // Spotify API endpoint for top tracks

    return lastValueFrom(this.http.get<TrackData[]>(`${this.expressBaseUrl}${endpoint}`));
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    const endpoint = `/artist-albums/${artistId}`; // Spotify API endpoint for related artists

    return lastValueFrom(this.http.get<AlbumData[]>(`${this.expressBaseUrl}${endpoint}`));
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    const endpoint = `/album/${albumId}`; // Spotify API endpoint for album

    return lastValueFrom(this.http.get<AlbumData>(`${this.expressBaseUrl}${endpoint}`));
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    const endpoint = `/album-tracks/${albumId}`; // Spotify API endpoint for tracks for album

    return lastValueFrom(this.http.get<TrackData[]>(`${this.expressBaseUrl}${endpoint}`));
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    const endpoint = `/track/${trackId}`; // Spotify API endpoint for tracks

    return lastValueFrom(this.http.get<TrackData>(`${this.expressBaseUrl}${endpoint}`));
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    const endpoint = `/track-audio-features/${trackId}`; // Spotify API endpoint for audio features

    return lastValueFrom(this.http.get<TrackFeature[]>(`${this.expressBaseUrl}${endpoint}`));
  }
}
