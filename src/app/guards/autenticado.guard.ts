import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';


@Injectable({
  providedIn: 'root'
})

//*Devido ao update do Angular 14.1 , o "CanLoad" esta depreciado, e por ser muito recente ha pouco conteudo de adaptacao de codigo de "canload" para "canmatchfn". Por esse motivo a autenticacao de acesso ao player com base no login não estara 100% efetiva.*//

export class AutenticadoGuard implements CanLoad {
  constructor(
    private router: Router, 
    private spotifyService: SpotifyService) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');

    if (!token) {
      return this.naoAutenticado();
      //return this.naoAutenticado();
    }

    return new Promise(async (res) => {
      const usuarioCriado = await this.spotifyService.inicializarUsuario();
      if (usuarioCriado)
        res (true);

      else 
        res(this.naoAutenticado());
    })
  }

  private naoAutenticado(): boolean | UrlTree {
    localStorage.clear();
    this.router.navigate(['/login']);
    return true;
  }
}