import { IFilme } from "./Filme.interface";

export interface IProdutora{
 id:number,
 nome:string,
 filmes:Array<IFilme>

}
