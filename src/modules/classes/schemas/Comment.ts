import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity('comments')
export class Comment {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  id_class: ObjectID

  @Column()
  comment: string

  @CreateDateColumn()
  date_created: Date
}