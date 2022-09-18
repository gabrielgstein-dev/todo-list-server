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
    name: 'project_id',
  })
  projectId: number;

  @ManyToOne(() => ProjectEntity, (project) => project.taskList)
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;
}
