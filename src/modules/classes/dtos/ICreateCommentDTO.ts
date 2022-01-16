import { ObjectID } from "typeorm";

export interface ICreateCommentDTO {
  id_class: ObjectID
  comment: string
}