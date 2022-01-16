import { ObjectID } from "typeorm";

export interface IUpdateClassDTO {
  id: ObjectID | string
  name?: string
  description?: string
  video?: string
  data_init?: Date
  data_end?: Date
}