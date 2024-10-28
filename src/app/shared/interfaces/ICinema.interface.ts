import { IFilme } from "./Filme.interface";



export interface ICinema{
  Id :number,
  idAdministrador :number,
  Name :String,

  // Administrador { get; set; } = new();
  //  Salas { get; set; } = new();
    Filmes_Em_Cartaz :IFilme[]
  //   Employees { get; set; } = new();
}
