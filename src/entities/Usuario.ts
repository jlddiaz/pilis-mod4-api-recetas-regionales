import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number 

  @Column()
  username: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date  
}
