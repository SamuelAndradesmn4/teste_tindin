import { getMongoRepository, MongoRepository, ObjectID } from "typeorm"
import { ICreateCommentDTO } from "../dtos/ICreateCommentDTO"
import { Comment } from "../schemas/Comment"
import { ICommentsRepository } from "./ICommentsRepository"

export class CommentsRepository implements ICommentsRepository {
  private repository: MongoRepository<Comment>

  constructor() {
    this.repository = getMongoRepository(Comment)
  }

  async create({ id_class, comment: comment_message }: ICreateCommentDTO): Promise<Comment> {
    const comment = this.repository.create({
      id_class,
      comment: comment_message
    })

    await this.repository.save(comment)

    return comment
  }

  async findAll(): Promise<Comment[]> {
    return await this.repository.find()
  }

  async findById(id: ObjectID | string): Promise<Comment> {
    return await this.repository.findOne(id)
  }

  async findByClassId(id_class: ObjectID | string): Promise<Comment[]> {
    return await this.repository.find({
      where: { id_class },
      order: {
        date_created: 'DESC'
      }
    })
  }

  async getLastCommentByClassId(id_class: ObjectID | string): Promise<Comment[]> {
    return await this.repository.find({
      where: { id_class },
      order: {
        date_created: 'DESC'
      }
    })
  }

  async delete(id_comment: string | ObjectID): Promise<void> {
    await this.repository.delete(id_comment)
  }
}