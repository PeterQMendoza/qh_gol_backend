// DTO de respuesta: lista de celdas vivas.
// SRP — solo define la forma del dato que sale por HTTP.

export class CellDto {
  x: number
  y: number
}

export class CellsResponseDto {
  cells: CellDto[]
  generation?: number
}

export class ResetResponseDto {
  message: string
}
