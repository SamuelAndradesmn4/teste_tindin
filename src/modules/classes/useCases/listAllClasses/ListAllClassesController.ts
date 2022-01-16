import { Request, Response } from "express";
import { container } from "tsyringe";
import validateParams from "../../../../utils/validateParams";
import { IListClassesDTO } from "../../dtos/IListClassesDTO";
import { listAllClassesSchema } from "../../schemas/schemasValidation/listAllClassesSchema";
import { ListAllClassesUseCase } from "./ListAllClassesUseCase";

export class ListAllClassesController {
  async handle(request: Request, response: Response) {
    const { name, description, data_end, data_init}: IListClassesDTO = request.query

    const page = Number(request.query.page)

    validateParams<IListClassesDTO>({ name, description, data_init, data_end }, listAllClassesSchema)

    const listAllClasses = container.resolve(ListAllClassesUseCase)

    const classes = await listAllClasses.execute({
      name,
      description,
      data_init,
      data_end,
      page
    })

    return response.json(classes)
  }
}