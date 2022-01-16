import { ObjectID } from "typeorm";
import { ICreateCommentDTO } from "../dtos/ICreateCommentDTO";
import { Comment } from "../schemas/Comment";

export interface ICommentsRepository {
  create(data: ICreateCommentDTO): Promise<Comment>
  findAll(): Promise<Comment[]>
  findById(id: ObjectID | string): Promise<Comment>
  delete(id_class: ObjectID | string): Promise<void>
  findByClassId(id_class: ObjectID | string): Promise<Comment[]>
  getLastCommentByClassId(id_class: ObjectID | string): Promise<Comment[]>
}