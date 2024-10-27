import { IsArray, ArrayNotEmpty, IsInt } from 'class-validator'

export class AddServicesToUserDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'La lista de IDs de servicios no puede estar vacía' })
  @IsInt({ each: true, message: 'Cada ID de servicio debe ser un número entero' })
  serviceIds: number[]
}
