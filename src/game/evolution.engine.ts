import { Injectable } from '@nestjs/common'
import { IEvolutionEngine } from './interfaces/evolution.interface'
import type { ISurvivalRule, IBirthRule } from './interfaces/rule.interface'
import type { INeighborCounter } from './interfaces/neighbor.interface'
import { IBoardMutator, IBoardState, ICoordinate } from './interfaces/board.interface'

@Injectable()
export class EvolutionEngine implements IEvolutionEngine {
  // Clase EvolutionEngine: Aplica las reglas del juego y calcula la siguiente generacion.
  constructor(
    private readonly survivalRule: ISurvivalRule,
    private readonly birthRule: IBirthRule,
    private readonly neighborCounter: INeighborCounter,
  ) {}

  next(state: IBoardState & IBoardMutator): void {
    const neighborMap = this.buildNeighborMap(state)
    const nextAlive = this.computeNextGeneration(neighborMap, state)
    this.applyNextGeneration(state, nextAlive)
  }


  private buildNeighborMap(state: IBoardState): Map<string, { coord: ICoordinate; count: number }> {
    // Construye un mapa de coordenada → cantidad de vecinos vivos.
    // Solo se consideran celdas que sean vecinas de al menos una celda viva.
    const map = new Map<string, { coord: ICoordinate; count: number }>()

    for (const { x, y } of state.getAliveCells()) {
      const count = this.neighborCounter.count(x, y, state)
      const key = `${x},${y}`
      if (!map.has(key)) map.set(key, { coord: { x, y }, count: 0 })

      // Registrar también cada vecino en el mapa para evaluar nacimientos
      // (reutilizamos el contador del motor sobre el estado actual)
    }

    // Reconstruimos con el enfoque canónico: acumular conteos desde las vivas
    return this.accumulateNeighborCounts(state)
  }

  private accumulateNeighborCounts(
    state: IBoardState,
  ): Map<string, { coord: ICoordinate; count: number }> {
    const map = new Map<string, { coord: ICoordinate; count: number }>()

    const ensure = (x: number, y: number) => {
      const key = `${x},${y}`
      if (!map.has(key)) map.set(key, { coord: { x, y }, count: 0 })
      return map.get(key)!
    }

    for (const { x, y } of state.getAliveCells()) {
      const neighbors = this.neighborCounter.count(x, y, state)
      // Guardamos el conteo propio para la regla de supervivencia
      ensure(x, y).count = neighbors

      // Para cada celda muerta adyacente también necesitamos su conteo
      // Hacemos un segundo barrido limitado a las vecinas de las vivas
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue
          const nx = x + dx
          const ny = y + dy
          const entry = ensure(nx, ny)
          if (!state.isAlive(nx, ny)) {
            // Re-calculamos el conteo solo si aún no fue calculado
            if (entry.count === 0) {
              entry.count = this.neighborCounter.count(nx, ny, state)
            }
          }
        }
      }
    }

    return map
  }

  private computeNextGeneration(
    neighborMap: Map<string, { coord: ICoordinate; count: number }>,
    state: IBoardState,
  ): ICoordinate[] {
    const nextAlive: ICoordinate[] = []

    for (const { coord, count } of neighborMap.values()) {
      const alive = state.isAlive(coord.x, coord.y)
      if (alive && this.survivalRule.shouldSurvive(count)) {
        nextAlive.push(coord)
      } else if (!alive && this.birthRule.shouldBeBorn(count)) {
        nextAlive.push(coord)
      }
    }

    return nextAlive
  }

  private applyNextGeneration(
    state: IBoardState & IBoardMutator,
    nextAlive: ICoordinate[],
  ): void {
    state.clear()
    for (const { x, y } of nextAlive) {
      state.setAlive(x, y)
    }
  }
}
