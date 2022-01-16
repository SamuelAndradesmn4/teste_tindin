import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteClassUseCase } from "./DeleteClassUseCase";

export class DeleteClassController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteClass = container.resolve(DeleteClassUseCase)

    await deleteClass.execute(id)

    return response.send()
  }
}