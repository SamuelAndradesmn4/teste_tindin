import { inject, injectable } from "tsyringe";
import { ICommentsRepository } from "../../repositories/ICommentsRepository";

const PER_PAGE = 50

@injectable()
export class ListAllCommentsUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  async execute(page?: number) {
    const comments = await this.commentsRepository.findAll()

    let paginatedComments = null

    if (page) {
      const pageStart = (page - 1) * PER_PAGE
      const pageEnd = pageStart + PER_PAGE

      paginatedComments = comments.slice(pageStart, pageEnd)
    }

    return paginatedComments || comments
  }
}