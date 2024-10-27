import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUserAndServiceTables1730072631163 implements MigrationInterface {
  name = 'CreateUserAndServiceTables1730072631163'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_services_service" DROP CONSTRAINT "FK_bdc5942f80cf0c512de309e7f85"`)
    await queryRunner.query(`ALTER TABLE "service" ADD "status" boolean NOT NULL DEFAULT true`)
    await queryRunner.query(`ALTER TABLE "service" ADD "deleteAt" TIMESTAMP`)
    await queryRunner.query(`ALTER TABLE "user" ADD "status" boolean NOT NULL DEFAULT true`)
    await queryRunner.query(`ALTER TABLE "user" ADD "deleteAt" TIMESTAMP`)
    await queryRunner.query(
      `ALTER TABLE "user_services_service" ADD CONSTRAINT "FK_bdc5942f80cf0c512de309e7f85" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_services_service" DROP CONSTRAINT "FK_bdc5942f80cf0c512de309e7f85"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleteAt"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`)
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "deleteAt"`)
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "status"`)
    await queryRunner.query(
      `ALTER TABLE "user_services_service" ADD CONSTRAINT "FK_bdc5942f80cf0c512de309e7f85" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }
}
