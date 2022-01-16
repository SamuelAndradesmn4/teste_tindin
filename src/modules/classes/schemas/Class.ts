import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('classes')
export class Class {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  video: string

  @Column()
  data_init: Date

  @Column()
  data_end: Date

  @CreateDateColumn()
  date_created: Date

  @UpdateDateColumn()
  date_updated: Date

  @Column()
  total_comments: Number
}