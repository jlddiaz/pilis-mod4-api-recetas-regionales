import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column('text')
  description: string

  @Column()
  image: string

  @Column('text')
  ingredients: string

  @Column('text')
  preparation: string

  @Column()
  preparation_time: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date  
}
