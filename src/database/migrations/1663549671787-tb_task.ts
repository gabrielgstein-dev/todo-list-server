import { MigrationInterface, QueryRunner } from 'typeorm';

export class tbTask1663549671787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
      create table tb_task(
          id serial primary key,
          name varchar(255) not null,
          done boolean not null,
          id_project int references tb_project(id)
      );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
