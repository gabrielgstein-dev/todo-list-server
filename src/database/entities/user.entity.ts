import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('tb_user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'email',
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'password',
  })
  password: string;

  @OneToMany(() => ProjectEntity, (project) => project.user)
  projectList: ProjectEntity[];
}
