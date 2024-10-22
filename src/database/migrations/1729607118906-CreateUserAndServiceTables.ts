import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndServiceTables1729607118906 implements MigrationInterface {
    name = 'CreateUserAndServiceTables1729607118906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "costo" double precision NOT NULL, "categoria" character varying NOT NULL, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "rol" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_services_service" ("userId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_ec7e06ea1a07ae550dbf7ca3951" PRIMARY KEY ("userId", "serviceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1746bdf94ae25922f327f51a98" ON "user_services_service" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bdc5942f80cf0c512de309e7f8" ON "user_services_service" ("serviceId") `);
        await queryRunner.query(`ALTER TABLE "user_services_service" ADD CONSTRAINT "FK_1746bdf94ae25922f327f51a988" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_services_service" ADD CONSTRAINT "FK_bdc5942f80cf0c512de309e7f85" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_services_service" DROP CONSTRAINT "FK_bdc5942f80cf0c512de309e7f85"`);
        await queryRunner.query(`ALTER TABLE "user_services_service" DROP CONSTRAINT "FK_1746bdf94ae25922f327f51a988"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bdc5942f80cf0c512de309e7f8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1746bdf94ae25922f327f51a98"`);
        await queryRunner.query(`DROP TABLE "user_services_service"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "service"`);
    }

}
