import { IAssento, IAssentoOcupadoEmSessao } from "./Assento.interface"

export interface ISessao {
  id: number,
  id_sala: number,
  hotaDaSessao: string
  // assentosOcupado: IAssentoOcupado[]
}
