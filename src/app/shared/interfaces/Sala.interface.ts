import { IFilme } from "./Filme.interface";
import { ISessao } from "./Sessao.interface";

export interface ISala {
  id: number,
  id_filme: number,
  id_filme_sala: IFilme_has_tb_sala[],
  name: string,
  quantidadeDeAssentos: Number,
  quantidadeDeSessaos: Number,
  filme: IFilme,
  sessaos: ISessao[]
}

export interface sessaosIds {

  sessaosId: Number

}

export interface IFilme_has_tb_sala {
  filme_id: number,
  sala_id: number
}
