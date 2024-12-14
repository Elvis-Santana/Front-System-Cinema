import { IFilme } from "./Filme.interface";
import { IUser } from "./IUser.interface";
import { ISala } from "./Sala.interface";



export interface ICinema{
  id :number,
  idAdministrador :number,
  name :String,
  precoDoIngresso:number,
  Administrador :IUser
  Salas :ISala[],
    filmes_Em_Cartaz :IFilme[]
  //   Employees { get; set; } = new();
}
