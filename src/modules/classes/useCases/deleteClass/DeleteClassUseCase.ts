import { inject, injectable } from "tsyringe";
import { ObjectID } from "typeorm";
import { AppError } from "../../../../shared/errors/AppError";
import { IClassesRepository } from "../../repositories/IClassesRepository";

@injectable()
export class DeleteClassUseCase {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository
  ) {}

  async execute(id_class: ObjectID | string) {
    const _class = await this.classesRepository.findById(id_class)

    if (!_class) {
      throw new AppError('You cannot delete a non-existent class')
    }

    await this.classesRepository.delete(id_class)
  }
}