import Joi from 'joi'  /*bibliooteca para validar os tipos de objetos*/
import { AppError } from '../shared/errors/AppError'

export default function<T> (params: T, schema: Joi.ObjectSchema): T {
  const validation = schema.validate(params)

  if (validation.error) {
    throw new AppError(validation.error.details[0].message)
  }

  return validation.value
}