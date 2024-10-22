import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Service } from '../../entities/service.entitiy';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  const userRepo = getRepository(User);
  const serviceRepo = getRepository(Service);

  const hashedPassword = await bcrypt.hash('password123', 10);
  const users = [
    { nombre: 'Admin', email: 'admin@example.com', password: hashedPassword, rol: 'admin' },
    { nombre: 'User', email: 'user@example.com', password: hashedPassword, rol: 'user' }
  ];

  const services = [
    { nombre: 'Servicio 1', descripcion: 'Descripción 1', costo: 100, categoria: 'Tech' },
    { nombre: 'Servicio 2', descripcion: 'Descripción 2', costo: 200, categoria: 'Health' }
  ];

  await userRepo.save(users);
  await serviceRepo.save(services);
};