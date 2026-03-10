// Interfaces para operaciones de regla del juego de la vida

export interface ISurvivalRule {
  shouldSurvive(neighborCount: number): boolean
}

export interface IBirthRule {
  shouldBeBorn(neighborCount: number): boolean
}
