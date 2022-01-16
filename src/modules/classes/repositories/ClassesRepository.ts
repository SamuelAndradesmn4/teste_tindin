import { getMongoRepository, MongoRepository, ObjectID } from "typeorm";
import { ICreateClassDTO } from "../dtos/ICreateClassDTO";
import { Class } from "../schemas/Class";
import { IClassesRepository } from "./IClassesRepository";

export class ClassesRepository implements IClassesRepository {
  private repository: MongoRepository<Class>

  constructor() {
    this.repository = getMongoRepository(Class)
  }

  async create({ name, description, video, data_init, data_end }: ICreateClassDTO): Promise<Class> {
    const _class = this.repository.create({
      name,
      description,
      video,
      data_init,
      data_end,
      total_comments: 0
    })

    await this.repository.save(_class)

    return _class
  }

  async findAll(): Promise<Class[]> {
    const classes = await this.repository.find()

    return classes
  }

  async findById(id: ObjectID | string): Promise<Class> {
    return await this.repository.findOne(id)
  }

  async incrementTotalCommentsById(id: ObjectID): Promise<void> {
    const _class = await this.repository.findOne(id)

    _class.total_comments = Number(_class.total_comments) + 1

    await this.repository.save(_class)
  }

  async decrementTotalCommentsById(id: ObjectID): Promise<void> {
    const _class = await this.repository.findOne(id)

    _class.total_comments = Number(_class.total_comments) - 1

    await this.repository.save(_class)
  }

  async save(_class: Class): Promise<Class> {
    return await this.repository.save(_class)
  }

  async delete(id_class: string | ObjectID): Promise<void> {
    await this.repository.delete(id_class)
  }
}