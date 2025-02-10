import { IFilme } from "../interfaces/Filme.interface";
import { ICinema } from "../interfaces/ICinema.interface";
import { IUser } from "../interfaces/IUser.interface";
import { ISala } from "../interfaces/Sala.interface";


export class CinemaModel implements ICinema{
  id!: number;
  idAdministrador!: number;
  name!: String;
  precoDoIngresso!: number;
  Administrador!: IUser;
  salas!: ISala[];
  filmes_Em_Cartaz!: IFilme[];




}
