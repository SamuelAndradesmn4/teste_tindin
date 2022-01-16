import { Request, Response } from "express"
import { container } from "tsyringe"
import validateParams from "../../../../utils/validateParams"
import { ICreateCommentDTO } from "../../dtos/ICreateCommentDTO"
import { ClassesRepository } from "../../repositories/ClassesRepository"
import { createCommentSchema } from "../../schemas/schemasValidation/createCommentSchema"
import { CreateCommentUseCase } from "./CreateCommentUseCase"

export class CreateCommentController {
  async handle(request: Request, response: Response) {
    const { id_class, comment: comment_text } = request.body

    validateParams<ICreateCommentDTO>({
      id_class,
      comment: comment_text
    }, createCommentSchema)

    const createComment = container.resolve(CreateCommentUseCase)

    const comment = await createComment.execute({
      id_class,
      comment: comment_text
    })

    return response.status(201).json(comment)
  }
}