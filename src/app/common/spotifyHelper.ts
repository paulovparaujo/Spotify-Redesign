import { IUsuario } from "../interfaces/IUsuario";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{ 
    return {
        id:user.id,
        name: user.display_name,
        imagemUrl: user.images.pop().url
    }

}