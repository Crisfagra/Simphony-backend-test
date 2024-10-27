import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class CreateServiceDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  nombre: string

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
  descripcion: string

  @IsNotEmpty({ message: 'El costo es obligatorio' })
  @IsNumber({}, { message: 'El costo debe ser un número' })
  costo: number

  @IsNotEmpty({ message: 'La categoría es obligatoria' })
  @IsString({ message: 'La categoría debe ser una cadena de caracteres' })
  categoria: string
}
