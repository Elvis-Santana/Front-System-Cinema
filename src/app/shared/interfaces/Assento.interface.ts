export interface IAssento {
  id: Number,
  sala_id:Number,
  numeroAssento: Number
  AssentoOcupado: IAssentoOcupado[],
}

export interface IAssentoOcupado{
 id:Number,
 id_Assento:Number,
 sessao_id: Number,
 sala_id:Number
 dataEHora:string,
 ocupado: boolean,

}
