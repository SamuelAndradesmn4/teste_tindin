import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUpdateClassDTO } from "../../dtos/IUpdateClassDTO";
import { IClassesRepository } from "../../repositories/IClassesRepository";

@injectable()
export class UpdateClassUseCase {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository
  ) {}

  async execute({ id, name, description, video, data_init, data_end }: IUpdateClassDTO) {
    const _class = await this.classesRepository.findById(id)

    if (!_class) {
      throw new AppError('You cannot update a non-existent class')
    }

    _class.name = name
    _class.description = description
    _class.video = video
    _class.data_init = data_init
    _class.data_end = data_end

    await this.classesRepository.save(_class)

    return _class
  }
}