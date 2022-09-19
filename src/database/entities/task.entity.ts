import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('tb_task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'done',
  })
  done: boolean;

  @Column({
    name: 'id_project',
  })
  projectId: number;

  @ManyToOne(() => ProjectEntity, (project) => project.taskList)
  @JoinColumn({ name: 'id_project' })
  project: ProjectEntity;
}
