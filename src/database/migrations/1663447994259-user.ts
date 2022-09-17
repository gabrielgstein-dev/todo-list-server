import { MigrationInterface, QueryRunner } from 'typeorm';

export class user1663447994259 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
      create table tb_user(
          id serial primary key,
          name varchar(255) not null,
          email varchar(255) not null,
          password varchar(255) not null
      );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
