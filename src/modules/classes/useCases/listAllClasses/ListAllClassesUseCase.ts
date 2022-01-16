import { inject, injectable } from "tsyringe";
import { IListClassesDTO } from "../../dtos/IListClassesDTO";
import { IClassesRepository } from "../../repositories/IClassesRepository";
import { ICommentsRepository } from "../../repositories/ICommentsRepository";

const PER_PAGE = 50

@injectable()
export class ListAllClassesUseCase {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository
  ) {}

  async execute({ name, description, data_init, data_end, page }: IListClassesDTO) {
    const classes = await this.classesRepository.findAll()

    let serializedClasses = classes

    if (name) {
      serializedClasses = serializedClasses.filter(_class => _class.name.toLowerCase().includes(name.toLowerCase()))
    }

    if (description) {
      serializedClasses = serializedClasses.filter(_class => _class.description.toLowerCase().includes(description.toLowerCase()))
    }

    if (data_init) {
      let date_init_time = new Date(data_init).getTime()
      date_init_time = date_init_time - (date_init_time % 86400000)

      serializedClasses = serializedClasses.filter(_class => {
        let time = new Date(_class.data_init).getTime()
        time = time - (time % 86400000)

        return time === date_init_time
      })
    }

    if (data_end) {
      let data_end_time = new Date(data_end).getTime()
      data_end_time = data_end_time - (data_end_time % 86400000)

      serializedClasses = serializedClasses.filter(_class => {
        let time = new Date(_class.data_end).getTime()
        time = time - (time % 86400000)

        return time === data_end_time
      })
    }

    const classesWithMessage = await Promise.all(serializedClasses.map(async _class => {
      const comment = await this.commentsRepository.getLastCommentByClassId(String(_class.id))

      if (!comment || comment.length === 0) {
        return {
          ..._class,
          last_comment: '',
          last_comment_date: ''
        }
      }

      return {
        ..._class,
        last_comment: comment[0].comment,
        last_comment_date: comment[0].date_created
      }
    }))

    let paginatedClasses = null

    if (page) {
      const pageStart = (page - 1) * PER_PAGE
      const pageEnd = pageStart + PER_PAGE

      paginatedClasses = classesWithMessage.slice(pageStart, pageEnd)
    }

    return paginatedClasses || classesWithMessage
  }
}