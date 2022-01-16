import { Request, Response } from "express";
import { container } from "tsyringe";
import validateParams from "../../../../utils/validateParams";
import { ICreateClassDTO } from "../../dtos/ICreateClassDTO";
import { createClassSchema } from "../../schemas/schemasValidation/createClassSchema";
import { CreateClassUseCase } from "./CreateClassUseCase";

export class CreateClassController {
  async handle(request: Request, response: Response) {
    const { name, description, video, data_init, data_end } = request.body

    validateParams<ICreateClassDTO>({
      name,
      description,
      video,
      data_init,
      data_end
    }, createClassSchema)

    const createClass = container.resolve(CreateClassUseCase)

    const _class = await createClass.execute({
      name,
      description,
      video,
      data_init,
      data_end
    })

    return response.status(201).json(_class)
  }
}