import { IAssento, IAssentoOcupado } from "./Assento.interface"

export interface ISessao {
  id: number,
  sala_id: number,
  horaDoDia: string
  // assentosOcupado: IAssentoOcupado[]
}
