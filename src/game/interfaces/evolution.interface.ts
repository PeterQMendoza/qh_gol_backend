// Interfaces que define operaciones de evolucion en el tablero
import { IBoardMutator, IBoardState } from "./board.interface"

export interface IEvolutionEngine {
  next(state: IBoardState & IBoardMutator): void
}
