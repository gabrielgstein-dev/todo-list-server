import { MigrationInterface, QueryRunner } from 'typeorm';

export class project1663512183393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
      create table tb_project(
          id serial primary key,
          name varchar(255) not null,
          password varchar(255) not null,
          tasks int references tb_task(id)
      );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
