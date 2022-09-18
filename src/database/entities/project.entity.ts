import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { TaskEntity } from './task.entity';

@Entity('tb_project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @OneToOne((type) => TaskEntity)
  @JoinColumn()
  taskList: TaskEntity;
}
