import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDatabase1741042601338 implements MigrationInterface {
  name = 'InitialDatabase1741042601338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "roles" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")); COMMENT ON COLUMN "roles"."name" IS \'Name of the role (must be unique)\'');
    await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."name" IS \'Full name of the user\'; COMMENT ON COLUMN "users"."email" IS \'Unique email address of the user\'; COMMENT ON COLUMN "users"."password" IS \'Password hash (nullable for first-time users)\'');
    await queryRunner.query('CREATE TABLE "students" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "birthday" date NOT NULL, "gender" character varying(1) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id")); COMMENT ON COLUMN "students"."name" IS \'Full name of the student\'; COMMENT ON COLUMN "students"."birthday" IS \'Birthday of the student\'; COMMENT ON COLUMN "students"."gender" IS \'Gender of the student (Male or Female)\'');
    await queryRunner.query('CREATE TABLE "grades" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_e71c6cb25c8ed8d87058295023b" UNIQUE ("name"), CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id")); COMMENT ON COLUMN "grades"."name" IS \'Name of the grade (must be unique)\'');
    await queryRunner.query('CREATE TABLE "shifts" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_3ef662f98036997809da8338d31" UNIQUE ("name"), CONSTRAINT "PK_84d692e367e4d6cdf045828768c" PRIMARY KEY ("id")); COMMENT ON COLUMN "shifts"."name" IS \'Name of the shift (must be unique)\'');
    await queryRunner.query('CREATE TABLE "tuitions" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "due_date" date NOT NULL, "amount" character varying(20) NOT NULL, "is_enrollment" boolean NOT NULL DEFAULT false, "is_paid" boolean NOT NULL DEFAULT false, "paid_at" date, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "enrollment_id" integer NOT NULL, CONSTRAINT "PK_86f680e7b5ce273d601571232c0" PRIMARY KEY ("id")); COMMENT ON COLUMN "tuitions"."due_date" IS \'Due date for the tuition payment\'; COMMENT ON COLUMN "tuitions"."amount" IS \'Amount to be paid (stored as string for precise decimal handling)\'; COMMENT ON COLUMN "tuitions"."is_enrollment" IS \'Indicates if this is an enrollment fee\'; COMMENT ON COLUMN "tuitions"."is_paid" IS \'Indicates if the tuition has been paid\'; COMMENT ON COLUMN "tuitions"."paid_at" IS \'Date when the payment was mark as paid\'');
    await queryRunner.query('CREATE TABLE "enrollments" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" boolean NOT NULL DEFAULT true, "is_daycare" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "student_id" integer NOT NULL, "guardian_id" integer NOT NULL, "grade_id" integer NOT NULL, "shift_id" integer NOT NULL, CONSTRAINT "REL_307813fe255896d6ebf3e6cd55" UNIQUE ("student_id"), CONSTRAINT "PK_7c0f752f9fb68bf6ed7367ab00f" PRIMARY KEY ("id")); COMMENT ON COLUMN "enrollments"."status" IS \'Indicates if the enrollment is active\'; COMMENT ON COLUMN "enrollments"."is_daycare" IS \'Indicates if the enrollment includes daycare\'');
    await queryRunner.query('CREATE TABLE "guardians" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "cpf" character varying(50) NOT NULL, "email" character varying(255), "address" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_56cba24818544e78f8e30b600e4" UNIQUE ("cpf"), CONSTRAINT "UQ_2822ea52513239fdd508c016e3b" UNIQUE ("email"), CONSTRAINT "PK_3dcf02f3dc96a2c017106f280be" PRIMARY KEY ("id")); COMMENT ON COLUMN "guardians"."name" IS \'Full name of the guardian\'; COMMENT ON COLUMN "guardians"."cpf" IS \'CPF of the guardian (unique)\'; COMMENT ON COLUMN "guardians"."email" IS \'Email address of the guardian (unique)\'; COMMENT ON COLUMN "guardians"."address" IS \'Address of the guardian\'');
    await queryRunner.query('CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying(20) NOT NULL, "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "guardian_id" integer NOT NULL, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id")); COMMENT ON COLUMN "contacts"."phone" IS \'Phone number of the contact\'; COMMENT ON COLUMN "contacts"."status" IS \'Indicates if the contact is active\'');
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "tuitions" ADD CONSTRAINT "FK_9ea92f6000c0af78855d2e42a0d" FOREIGN KEY ("enrollment_id") REFERENCES "enrollments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "enrollments" ADD CONSTRAINT "FK_307813fe255896d6ebf3e6cd55c" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "enrollments" ADD CONSTRAINT "FK_3be6b0f01e3f3cd4002ff4589a1" FOREIGN KEY ("guardian_id") REFERENCES "guardians"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "enrollments" ADD CONSTRAINT "FK_35097b6b8ce9d33f8fba1703085" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "enrollments" ADD CONSTRAINT "FK_ee417e6085b4420d62c7c7e728e" FOREIGN KEY ("shift_id") REFERENCES "shifts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "contacts" ADD CONSTRAINT "FK_afee01e686fee0d60df815a2cc4" FOREIGN KEY ("guardian_id") REFERENCES "guardians"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "contacts" DROP CONSTRAINT "FK_afee01e686fee0d60df815a2cc4"');
    await queryRunner.query('ALTER TABLE "enrollments" DROP CONSTRAINT "FK_ee417e6085b4420d62c7c7e728e"');
    await queryRunner.query('ALTER TABLE "enrollments" DROP CONSTRAINT "FK_35097b6b8ce9d33f8fba1703085"');
    await queryRunner.query('ALTER TABLE "enrollments" DROP CONSTRAINT "FK_3be6b0f01e3f3cd4002ff4589a1"');
    await queryRunner.query('ALTER TABLE "enrollments" DROP CONSTRAINT "FK_307813fe255896d6ebf3e6cd55c"');
    await queryRunner.query('ALTER TABLE "tuitions" DROP CONSTRAINT "FK_9ea92f6000c0af78855d2e42a0d"');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"');
    await queryRunner.query('DROP TABLE "contacts"');
    await queryRunner.query('DROP TABLE "guardians"');
    await queryRunner.query('DROP TABLE "enrollments"');
    await queryRunner.query('DROP TABLE "tuitions"');
    await queryRunner.query('DROP TABLE "shifts"');
    await queryRunner.query('DROP TABLE "grades"');
    await queryRunner.query('DROP TABLE "students"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TABLE "roles"');
  }

}
