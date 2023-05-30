import { Component } from '@angular/core';
import { faHome, faSearch, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons'
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent {

  menuSelecionado = 'Home';

  playlist: IPlaylist[] = [];


 //Icones

 homeIcone = faHome;
 pesquisarIcone = faSearch;
 artistaIcone = faGuitar;
 playlistIcone = faMusic;


 constructor(private spotifyService: SpotifyService) {}

 ngOnInit(): void {
  this.buscarPlaylist();
 }

 botaoClick(botao: string){
  this.menuSelecionado = botao
 }

 async buscarPlaylist(){
  this.playlist = await this.spotifyService.buscarPlaylistUsuario();
  console.log(this.playlist);
 }


}
