import { IFilme } from "./Filme.interface";
import { IUser } from "./IUser.interface";



export interface ICinema{
  id :number,
  idAdministrador :number,
  name :String,
  precoDoIngresso:number,
  Administrador :IUser
  //  Salas { get; set; } = new();
    filmes_Em_Cartaz :IFilme[]
  //   Employees { get; set; } = new();
}
