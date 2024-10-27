import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserAndServiceTables1730072911405 implements MigrationInterface {
  name = 'CreateUserAndServiceTables1730072911405'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "status"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "status" boolean NOT NULL DEFAULT true`)
    await queryRunner.query(`ALTER TABLE "service" ADD "status" boolean NOT NULL DEFAULT true`)
  }
}
