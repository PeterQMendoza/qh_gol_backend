import { Controller, Get, Post } from '@nestjs/common'
import { GameService } from './game.service'
import { CellsResponseDto, ResetResponseDto } from './dto/game.dto'

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // Retorna el estado actual del tablero (celdas vivas).
  @Get('cells')
  getCells(): CellsResponseDto {
    return { cells: this.gameService.getActiveCells() }
  }


  // Avanza una generación y retorna el nuevo estado.
  @Get('next')
  nextGeneration(): CellsResponseDto {
    return { cells: this.gameService.nextGeneration() }
  }

  // Reinicia el tablero al patrón inicial.
  @Post('reset')
  reset(): ResetResponseDto {
    this.gameService.reset()
    return { message: 'Board reset to initial pattern' }
  }
}
