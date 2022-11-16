import { MovementType } from '../common/enums/movement-type'

export interface MovementCreateDto {
  user_id: number
  type: MovementType
  amount: number
}

export interface MovementUpdateDto {
  type: MovementType
  amount: number
}
