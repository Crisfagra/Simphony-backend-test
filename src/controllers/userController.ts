import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { nombre, email, password, rol } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User();
  user.nombre = nombre;
  user.email = email;
  user.password = hashedPassword;
  user.rol = rol;

  const userRepo = getRepository(User);
  await userRepo.save(user);
  res.status(201).json({ message: 'User created' });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepo = getRepository(User);
  const user = await userRepo.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id, rol: user.rol }, 'your_jwt_secret');
  res.json({ token });
};
