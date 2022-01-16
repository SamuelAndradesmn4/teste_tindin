import joi from 'joi'
import { IListClassesDTO } from '../../dtos/IListClassesDTO'

export const listAllClassesSchema = joi.object<IListClassesDTO>({
  name: joi.string().optional(),
  description: joi.string().optional(),
  data_init: joi.date().optional(),
  data_end: joi.date().optional()
})