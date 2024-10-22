import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { Service } from '../../entities/service.entitiy';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const serviceRepository = AppDataSource.getRepository(Service);

  const password1 = await bcrypt.hash('password.123', 10);
  const password2 = await bcrypt.hash('password.456', 10);

  const users = [
    {
      nombre: 'Admin',
      email: 'admin@example.com',
      password: password1,
      rol: 'admin',
    },
    {
      nombre: 'User1',
      email: 'user1@example.com',
      password: password2,
      rol: 'user',
    },
    {
      nombre: 'User2',
      email: 'user2@example.com',
      password: password2,
      rol: 'user',
    },
  ];

  const savedUsers = await userRepository.save(users);

  const services = [
    { nombre: 'Servicio 1', descripcion: 'Servicio de tecnologia', costo: 100, categoria: 'Tech' },
    { nombre: 'Servicio 2', descripcion: 'Servicio de salud', costo: 200, categoria: 'Health' },
    { nombre: 'Servicio 3', descripcion: 'Sericio de hogar', costo: 200, categoria: 'Home' },
    { nombre: 'Servicio 4', descripcion: 'Servicio movil', costo: 200, categoria: 'Movile' },
    { nombre: 'Servicio 5', descripcion: 'Servicio laboral', costo: 200, categoria: 'work' },
  ];

  const savedServices = await serviceRepository.save(services);

  savedUsers[0].services = [savedServices[0], savedServices[1]];
  savedUsers[1].services = [savedServices[2], savedServices[4]];
  savedUsers[2].services = [savedServices[3], savedServices[0]];


  await userRepository.save(savedUsers);

  console.log('Seeders ejecutados correctamente.');
  await AppDataSource.destroy();
};

seedDatabase().catch((error) => console.log('Error ejecutando seeders:', error));
