import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { Service } from '../entities/service.entitiy';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { In } from 'typeorm';

export const registerUser = async (req: Request, res: Response) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email: email } });
    if (user){
      return res.status(401).json({ message: 'Email already register for another user' });
    } 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepo.create({ nombre, email, password: hashedPassword, rol });
    await userRepo.save(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, rol: user.rol }, process.env.JWT_SECRET || 'jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error during login', error: error.message });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const userId = req.user && typeof req.user === 'object' ? req.user.userId : null;

  if (!userId) {
    return res.status(400).json({ message: 'Invalid user' });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user profile', error: error.message });
  }
};

export const associateServicesToUser = async (req: Request, res: Response) => {
  const { serviceIds } = req.body;
  const userId = req.params.id;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const serviceRepo = AppDataSource.getRepository(Service);

    const user = await userRepo.findOne({ where: { id: Number(userId) }, relations: ['services'] });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const services = await serviceRepo.findBy({ id: In(serviceIds) });

    if (services.length === 0) {
      return res.status(404).json({ message: 'No valid services found' });
    }

    user.services = [...user.services, ...services];
    await userRepo.save(user);

    res.status(200).json({ message: 'Services successfully associated to user', services: user.services });
  } catch (error) {
    res.status(400).json({ message: 'Error associating services to user', error: error.message });
  }
};

export const getUserServices = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: Number(userId) }, relations: ['services'] });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userInfo = {
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
      services: user.services,
    }

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user services', error: error.message });
  }
};
