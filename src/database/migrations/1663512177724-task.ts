import { MigrationInterface, QueryRunner } from 'typeorm';

export class task1663512177724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
      create table tb_task(
          id serial primary key,
          name varchar(255) not null,
          done boolean not null
      );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
