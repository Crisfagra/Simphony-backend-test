import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Service } from '../entities/service.entitiy'

export const createService = async (req: Request, res: Response): Promise<any> => {
  const { nombre, descripcion, costo, categoria } = req.body

  try {
    const serviceRepo = AppDataSource.getRepository(Service)
    const service = await serviceRepo.findOne({ where: { nombre: nombre } })
    if (service) {
      return res.status(401).json({ message: 'Service already register' })
    }
    const newService = serviceRepo.create({
      nombre,
      descripcion,
      costo,
      categoria,
    })
    await serviceRepo.save(newService)

    res.status(201).json({ message: 'Service created successfully', service: newService })
  } catch (error) {
    res.status(400).json({ message: 'Error creating service', error: error.message })
  }
}

export const getAllServices = async (req: Request, res: Response): Promise<any> => {
  try {
    const serviceRepo = AppDataSource.getRepository(Service)
    const services = await serviceRepo.find()
    res.status(200).json(services)
  } catch (error) {
    res.status(400).json({ message: 'Error fetching services', error: error.message })
  }
}

export const getServiceById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    const serviceRepo = AppDataSource.getRepository(Service)
    const service = await serviceRepo.findOne({ where: { id: Number(id) } })

    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

    res.status(200).json(service)
  } catch (error) {
    res.status(400).json({ message: 'Error fetching service', error: error.message })
  }
}

export const updateService = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const { nombre, descripcion, costo, categoria } = req.body

  try {
    const serviceRepo = AppDataSource.getRepository(Service)
    const service = await serviceRepo.findOne({ where: { id: Number(id) } })

    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

    service.nombre = nombre || service.nombre
    service.descripcion = descripcion || service.descripcion
    service.costo = costo || service.costo
    service.categoria = categoria || service.categoria

    await serviceRepo.save(service)

    res.status(200).json({ message: 'Service updated successfully', service })
  } catch (error) {
    res.status(400).json({ message: 'Error updating service', error: error.message })
  }
}

export const deleteService = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  try {
    const serviceRepo = AppDataSource.getRepository(Service)
    const service = await serviceRepo.findOne({ where: { id: Number(id) } })

    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

    await serviceRepo.softRemove(service)

    res.status(200).json({ message: 'Service deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Error deleting service', error: error.message })
  }
}
