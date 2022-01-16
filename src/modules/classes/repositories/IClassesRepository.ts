import { ObjectID } from "typeorm";
import { ICreateClassDTO } from "../dtos/ICreateClassDTO";
import { Class } from "../schemas/Class";

export interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>
  findAll(): Promise<Class[]>
  findById(id: ObjectID | string): Promise<Class>
  delete(id_class: ObjectID | string): Promise<void>
  incrementTotalCommentsById(id: ObjectID): Promise<void>
  decrementTotalCommentsById(id: ObjectID): Promise<void>
  save(_class: Class): Promise<Class>
}