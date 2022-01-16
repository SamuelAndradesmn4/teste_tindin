import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCommentUseCase } from "./DeleteCommentUseCase";

export class DeleteCommentController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteComment = container.resolve(DeleteCommentUseCase)

    await deleteComment.execute(id)

    return response.send()
  }
}