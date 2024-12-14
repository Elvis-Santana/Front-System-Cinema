import { environment } from "@env";

export enum Ports {

  Api_CSharp_PortsLogin = "http://localhost:5204/api/Login?token=",

  Api_CSharp_PortsProdutora = "http://localhost:5204/api/Filmes",
  Api_CSharp_PortsCinema = "http://localhost:5204/api/Filmes",

  Api_CSharp_UsuarioClinet = "http://localhost:5204/api/UserClient",


}

export interface production {
  API: String

}
export interface development {
  API: String,
  JOSN: String
}
export interface IPortFilmesUrl {
  production: production,
  development: development,
  default: String


}

declare const PORT_CINEMA: String;
declare const PORT_CINEMA_JSON: String;

declare const PORT_FILMES: String;
declare const PORT_FILMES_JSON: String;

declare const PORT_PRODUTORA: String;
declare const PORT_PRODUTORA_JSON: String;

declare const PORT_SESSAO: String;
declare const PORT_SESSAO_JSON: String;

export const _PORTFILMES: IPortFilmesUrl = {
  production: {
    API: PORT_FILMES,
  },
  development: {
    API: PORT_FILMES,
    JOSN: PORT_FILMES_JSON
  },
  default: PORT_FILMES
}

export const _PORTCINEMA: IPortFilmesUrl = {
  production: {
    API: PORT_CINEMA,
  },
  development: {
    API: PORT_CINEMA,
    JOSN: PORT_CINEMA_JSON
  },
  default: PORT_CINEMA
}

export const _PORTPRODUTORA: IPortFilmesUrl = {
  production: {
    API: PORT_PRODUTORA
  },
  development: {
    API: PORT_PRODUTORA,
    JOSN: PORT_PRODUTORA_JSON
  },
  default: PORT_PRODUTORA
}

const _PORTSESSAO: IPortFilmesUrl = {

  production: {
    API: PORT_SESSAO,
  },
  development: {
    API: PORT_SESSAO,
    JOSN: PORT_SESSAO_JSON
  },
  default: PORT_SESSAO
}

