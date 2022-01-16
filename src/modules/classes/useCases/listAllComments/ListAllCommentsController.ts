import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllCommentsUseCase } from "./ListAllCommentsUseCase";

export class ListAllCommentsController {
  async handle(request: Request, response: Response) {
    const listAllComments = container.resolve(ListAllCommentsUseCase)

    const page = Number(request.query.page)

    const comments = await listAllComments.execute(page)

    return response.json(comments)
  }
}