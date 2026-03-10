import { Injectable } from '@nestjs/common'
import { IBirthRule, ISurvivalRule } from '../interfaces/rule.interface'

@Injectable()
export class ConwaySurvivalRule implements ISurvivalRule {
  // Clase ConwaySurvivalRule: Establece la regla de supervivencia
  // Regla N1: Una celula viva sobrevive con 2 o 3 vecinos.
  shouldSurvive(neighborCount: number): boolean {
    return neighborCount === 2 || neighborCount === 3
  }
}

/**
 * Regla de nacimiento de Conway:
 * Una celda muerta nace si tiene exactamente 3 vecinos.
 * SRP — solo evalúa nacimiento.
 */
@Injectable()
export class ConwayBirthRule implements IBirthRule {
  // Clase ConwayBirthRule: Establece la regla de nacimiento
  // Regla N2: Una celula muerta nace si tiene exactamente 3 vecinos.
  shouldBeBorn(neighborCount: number): boolean {
    return neighborCount === 3
  }
}
