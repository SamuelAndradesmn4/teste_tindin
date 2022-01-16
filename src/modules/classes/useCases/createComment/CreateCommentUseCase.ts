import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateCommentDTO } from "../../dtos/ICreateCommentDTO"
import { IClassesRepository } from "../../repositories/IClassesRepository"
import { ICommentsRepository } from "../../repositories/ICommentsRepository"

@injectable()
export class CreateCommentUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository
  ) {}

  async execute({ id_class, comment: comment_text }: ICreateCommentDTO) {
    const _class = await this.classesRepository.findById(id_class)

    if (!_class) {
      throw new AppError('No class found for this id', 404)
    }

    const comment = await this.commentsRepository.create({
      id_class,
      comment: comment_text
    })

    await this.classesRepository.incrementTotalCommentsById(id_class)

    return comment
  }
}