import joi from 'joi'
import { ICreateClassDTO } from '../../dtos/ICreateClassDTO'

export const createClassSchema = joi.object<ICreateClassDTO>({
  name: joi.string().required(),
  description: joi.string().required(),
  video: joi.string().uri().required(),
  data_init: joi.date().required(),
  data_end: joi.date().required()
})