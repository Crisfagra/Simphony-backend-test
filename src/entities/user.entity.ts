import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Timestamp, DeleteDateColumn } from 'typeorm'
import { Service } from './service.entitiy'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  rol: string

  @DeleteDateColumn()
  deleteAt: Timestamp

  @ManyToMany(() => Service, (service) => service.users)
  @JoinTable()
  services: Service[]
}
