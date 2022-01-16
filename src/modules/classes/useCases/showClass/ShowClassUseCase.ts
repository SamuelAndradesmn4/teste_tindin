import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IClassesRepository } from '../../repositories/IClassesRepository';
import { ICommentsRepository } from '../../repositories/ICommentsRepository';

@injectable()
export class ShowClassUseCase {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  async execute(id_class: string) {
    const _class = await this.classesRepository.findById(id_class)

    if (!_class) {
      throw new AppError('No class found for this id', 404)
    }

    const comments = await this.commentsRepository.findByClassId(id_class)

    const last3Messages = comments.slice(0, 3)

    return {
      ..._class,
      comments: last3Messages
    }
  }
}