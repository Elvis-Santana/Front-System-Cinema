export interface IAssento {
  id: number,
  id_sala:number,
  numeroAssento: number
  assentoOcupadoEmSessao: IAssentoOcupadoEmSessao[],
}

export interface IAssentoOcupadoEmSessao{
 id:number,
 id_Assento:number,
 id_sessao: number,
 dataEHora:string,
 ocupado: boolean,

}
