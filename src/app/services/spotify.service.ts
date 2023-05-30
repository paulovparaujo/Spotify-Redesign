import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js'
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyPlaylistParaPlaylist, SpotifyUserParaUsuario } from '../common/spotifyHelper';
import { parseTemplate } from '@angular/compiler';
import { IPlaylist } from '../interfaces/IPlaylist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

    constructor() {
     this.spotifyApi = new Spotify ();
    }

    async inicializarUsuario() {
   if(!!this.usuario)
       return true;
  
    const token = localStorage.getItem('token');

   if(!token) //PROBLEMA DO TOKEN ESTAVA AQUI

     return false;

    try {
      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async obterSpotifyUsuario(){
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }
  
  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const RedirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + RedirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    console.log(window.location.hash)
    if (!window.location.hash)
      return '';

    

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
    //this.spotifyApi.skipToNext();
  }

  async buscarPlaylistUsuario(offset = 0, limit =50): Promise<IPlaylist[]>{
    const playlist = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });
    console.log(playlist);
    return playlist.items.map(SpotifyPlaylistParaPlaylist);

  }
}


