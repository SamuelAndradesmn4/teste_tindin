import joi from 'joi'

import { ICreateCommentDTO } from '../../dtos/ICreateCommentDTO'

export const createCommentSchema = joi.object<ICreateCommentDTO>({
  id_class: joi.string().required(),
  comment: joi.string().required()
})