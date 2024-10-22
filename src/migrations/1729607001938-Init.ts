import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1729607001938 implements MigrationInterface {
    name = 'Init1729607001938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'REQUESTER', "departmentDepartmentId" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("item_id" SERIAL NOT NULL, "title" character varying NOT NULL, "amount" numeric(20,4) NOT NULL, "quantity" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "userUserId" integer NOT NULL, "departmentDepartmentId" integer NOT NULL, CONSTRAINT "PK_8b21aa99996acd87a00c0ce553a" PRIMARY KEY ("item_id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("department_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_471da4b90e96c1ebe0af221e07b" UNIQUE ("name"), CONSTRAINT "PK_28a598987c3302c0b4dfc71f868" PRIMARY KEY ("department_id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0420b9deeafbe296951cb5cb840" FOREIGN KEY ("departmentDepartmentId") REFERENCES "department"("department_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_d194d8e37ef2a89ad1a5a18fbd5" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_2e6f73bc2404f49675ba90f88e9" FOREIGN KEY ("departmentDepartmentId") REFERENCES "department"("department_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_2e6f73bc2404f49675ba90f88e9"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_d194d8e37ef2a89ad1a5a18fbd5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0420b9deeafbe296951cb5cb840"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
