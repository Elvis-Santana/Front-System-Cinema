import { IAssento } from "./Assento.interface"

export interface ISessao{
    id: Number,
    sala_id: Number,
    horaDoDia: String
    assentos: IAssento[]
}
