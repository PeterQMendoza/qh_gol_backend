import { Injectable } from '@nestjs/common'
import { BoardState } from './entities/board-state.entity'
import { EvolutionEngine } from './evolution.engine'
import { ConwaySurvivalRule, ConwayBirthRule } from './rules/conway.rules'
import { MooreNeighborCounter } from './rules/moore-neighbor.counter'
// import { PulsarPattern } from './factories/pulsar.pattern'
import { IGameService } from './interfaces/game-service.interface'
import { IBoardPattern } from './interfaces/pattern.interface'
import { ICoordinate } from './interfaces/board.interface'
import { PistolGosperPattern } from './factories/pistol-gosper.pattern'
// import { SapoPattern } from './factories/sapo.pattern'

/**
 * Servicio principal del juego.
 *
 * SRP — coordina estado, motor y patrón inicial; no contiene reglas ni cálculos.
 * DIP — depende de IGameService, IBoardPattern y EvolutionEngine (inyectable).
 * OCP — cambiar el patrón inicial o el motor no requiere modificar este servicio.
 */
@Injectable()
export class GameService implements IGameService {
  private static readonly BOARD_SIZE = 64

  private readonly state: BoardState
  private readonly engine: EvolutionEngine
  private readonly initialPattern: IBoardPattern

  constructor() {
    const size = GameService.BOARD_SIZE

    this.state = new BoardState()
    this.engine = new EvolutionEngine(
      new ConwaySurvivalRule(),
      new ConwayBirthRule(),
      new MooreNeighborCounter(size),
    )
    this.initialPattern = new PistolGosperPattern()
    // this.initialPattern = new SapoPattern()

    this.loadPattern(this.initialPattern)
  }

  getActiveCells(): ICoordinate[] {
    return this.state.getAliveCells()
  }

  nextGeneration(): ICoordinate[] {
    this.engine.next(this.state)
    return this.state.getAliveCells()
  }

  reset(): void {
    this.state.clear()
    this.loadPattern(this.initialPattern)
  }

  private loadPattern(pattern: IBoardPattern): void {
    for (const { x, y } of pattern.getCells(GameService.BOARD_SIZE)) {
      this.state.setAlive(x, y)
    }
  }
}
