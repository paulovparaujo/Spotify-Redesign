import { Component } from '@angular/core';
import { faHome, faSearch, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent {

  menuSelecionado = 'Home';


 //Icones

 homeIcone = faHome;
 pesquisarIcone = faSearch;
 artistaIcone = faGuitar;
 playlistIcone = faMusic;


 constructor() {}

 ngOnInit(): void {
 }

 botaoClick(botao: string){
  this.menuSelecionado = botao
 }
}