import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTimestampForItems1729708600562 implements MigrationInterface {
    name = 'CreateTimestampForItems1729708600562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "item" ADD "updated_at" TIMESTAMP DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "created_at"`);
    }

}
