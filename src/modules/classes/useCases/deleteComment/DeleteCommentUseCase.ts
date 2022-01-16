import { inject, injectable } from "tsyringe";
import { ObjectID } from "typeorm";
import { AppError } from "../../../../shared/errors/AppError";
import { IClassesRepository } from "../../repositories/IClassesRepository";
import { ICommentsRepository } from "../../repositories/ICommentsRepository";

@injectable()
export class DeleteCommentUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository
  ) {}

  async execute(id_comment: ObjectID | string) {
    const comment = await this.commentsRepository.findById(id_comment)

    if (!comment) {
      throw new AppError('You cannot delete a non-existent comment')
    }

    await this.classesRepository.decrementTotalCommentsById(comment.id_class)

    await this.commentsRepository.delete(id_comment)
  }
}