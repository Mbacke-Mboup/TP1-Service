import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  // Une variable devra être ajoutée ici
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  result : boolean = false;
  artist : string = "";
  similarArtists : string [] = [];


  // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  // Le constructeur devra être ajouté ici
  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  constructor(public http: HttpClient){

  }

  async searchArtist():Promise<void>{
    this.result = true;
    
    // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
	  // La requête HTTP devra être ajoutée ici
    // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    let x = await lastValueFrom(this.http.get<any>("https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+this.artist+"&api_key=e34ebf8561ba7c653a21d1d99a1a0070&format=json"))
    for(let artist of x.similarartists.artist ){
      this.similarArtists.push(artist.name) 
      console.log(artist.image)
      
    }
    

  }

  newSearch():void{
    this.result = false;
    this.similarArtists.splice(0, this.similarArtists.length)
  }
}
