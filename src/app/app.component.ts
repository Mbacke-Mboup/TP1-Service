import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { lastValueFrom } from 'rxjs';
import { Album } from './models/Album';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  // Une variable devra être ajoutée ici
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  resultArtist : boolean = false;
  artist : string = "";
  albums: Album [] = [];
  


  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  // Le constructeur devra être ajouté ici
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  constructor(public http: HttpClient){

  }

  async searchArtist():Promise<void>{
    this.resultArtist = true;
    
    // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
	  // La requête HTTP devra être ajoutée ici
    // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

    let x = await lastValueFrom(this.http.get<any>("https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+this.artist+"&api_key=e34ebf8561ba7c653a21d1d99a1a0070&format=json"))
    for(let a of x.topalbums.album){
      this.albums.push(new Album(a.name, a.image[3]['#text'], a.artist.name));
    }
    this.artist = x.topalbums.album[0].artist.name;
    console.log(this.albums)

  }

  newSearch():void{
    this.resultArtist = false;
    this.albums.splice(0, this.albums.length);
  }


}
