import { Routes } from "@angular/router";
import { AutenticadoGuard } from "./guards/autenticado.guard";

export const AppRotas: Routes = [

    {
        path: '',
        redirectTo: 'player',
        pathMatch: 'full',
    // Caso o autenticadoGuard esteja funcionado com o CanMatch, eh interessante trocar 'login' por 'player' em redirectTo, para assim o localhost vazio direcionar para o player Spotify e fazer a logica de autenticacao com base no usuario logado. //
    },

    {
        path:'player',
        loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
        canLoad: [AutenticadoGuard]
    },
    
    

    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
        
    }
]