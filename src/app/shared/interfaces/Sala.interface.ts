import { IFilme } from "./Filme.interface";
import { ISessao } from "./Sessao.interface";

export interface ISala {
  id: Number,
  id_cinema: Number,
  id_filme: Number,
  name: String,
  quantidadeDeAssentos: Number,
  quantidadeDeSessaos: Number,
  Filme: IFilme,
  sessaos:ISessao[]
}

export interface sessaosIds{

    sessaosId:Number

}
