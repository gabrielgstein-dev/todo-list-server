import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TaskEntity } from './task.entity';
import { UserEntity } from './user.entity';

@Entity('tb_project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @OneToMany(() => TaskEntity, (task) => task.project)
  taskList: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.projectList)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
