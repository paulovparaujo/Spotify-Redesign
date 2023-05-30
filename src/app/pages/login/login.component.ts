import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(
    private spotifyservice: SpotifyService,
    private router: Router,) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallback()
  }

  verificarTokenUrlCallback() {
    const token = this.spotifyservice.obterTokenUrlCallback();
    if(!!token){
      this.spotifyservice.definirAccessToken(token);
      this.router.navigate(['/player']);
    }
  }

  abrirPaginaLogin() {
    window.location.href = this.spotifyservice.obterUrlLogin();
  }
}
