import { Injectable } from '@nestjs/common'
import { CellFlyweight } from '../entities/cell-flyweight.entity'
import { ICellFlyweight, IFlyweightFactory } from '../interfaces/flyweight.interface'

@Injectable()
export class CellFlyweightFactory implements IFlyweightFactory<ICellFlyweight> {
  // Clase CellFlyweightFactory: garantiza una sola instancia por coordenada
  private readonly cache = new Map<string, CellFlyweight>()

  get(x: number, y: number): ICellFlyweight {
    const key = `${x},${y}`
    if (!this.cache.has(key)) {
      this.cache.set(key, new CellFlyweight(x, y))
    }
    return this.cache.get(key)!
  }

  count(): number {
    return this.cache.size
  }
}
