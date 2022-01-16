import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowClassUseCase } from "./ShowClassUseCase";

export class ShowClassController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const showClass = container.resolve(ShowClassUseCase)

    const _class = await showClass.execute(id)

    return response.json(_class)
  }
}