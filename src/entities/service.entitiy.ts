import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('float')
  costo: number;

  @Column()
  categoria: string;

  @ManyToMany(() => User, (user) => user.services)
  users: User[];
}