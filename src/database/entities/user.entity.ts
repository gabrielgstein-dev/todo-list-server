import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
