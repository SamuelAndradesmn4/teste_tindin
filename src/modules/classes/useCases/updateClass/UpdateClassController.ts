import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateClassUseCase } from "./UpdateClassUseCase";

export class UpdateClassController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const { name, description, video, data_init, data_end } = request.body

    const updateClass = container.resolve(UpdateClassUseCase)

    const _class = await updateClass.execute({
      id,
      name,
      description,
      video,
      data_init,
      data_end
    })

    return response.json(_class)
  }
}