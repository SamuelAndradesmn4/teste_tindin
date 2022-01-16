import { inject, injectable } from "tsyringe";
import { ICreateClassDTO } from "../../dtos/ICreateClassDTO";
import { IClassesRepository } from "../../repositories/IClassesRepository";

@injectable()
export class CreateClassUseCase {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository
  ) {}

  async execute({ name, description, video, data_init, data_end }: ICreateClassDTO) {
    const _class = await this.classesRepository.create({
      name,
      description,
      video,
      data_init,
      data_end
    })

    return _class
  }
}